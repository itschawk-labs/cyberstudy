
import 'dotenv/config';
import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Optional DNS configuration.
if (process.env.DNS_SERVERS) {
  dns.setServers(
    process.env.DNS_SERVERS.split(',')
      .map(v => v.trim())
      .filter(Boolean)
  );
}

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:4200'
}));
app.use(express.json({ limit: '50kb' }));

// Database fields.
const fields = {
  topics: [
    'topicName', 'category', 'description',
    'difficulty', 'status', 'notes'
  ],
  labs: [
    'title', 'relatedTopic', 'description',
    'tools', 'labDate', 'status', 'notes'
  ],
  resources: [
    'title', 'type', 'relatedTopic',
    'description', 'link', 'notes'
  ]
};

const required = {
  topics: ['topicName', 'category', 'difficulty', 'status'],
  labs: ['title', 'status'],
  resources: ['title', 'type']
};

// Mongoose models.
const models = {};

for (const [kind, keys] of Object.entries(fields)) {
  const schema = {};

  for (const key of keys) {
    schema[key] = {
      type: String,
      trim: true,
      maxlength: 2000,
      required: required[kind].includes(key)
    };
  }

  models[kind] = mongoose.model(
    kind,
    new mongoose.Schema(schema, {
      timestamps: true,
      strict: 'throw'
    })
  );
}

// Async error wrapper.
const wrap = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Validate and sanitize database records.
function sanitize(kind, body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw Object.assign(
      new Error('Object required'),
      { status: 400 }
    );
  }

  const output = {};

  for (const key of fields[kind]) {
    if (body[key] !== undefined) {
      if (typeof body[key] !== 'string') {
        throw Object.assign(
          new Error(`${key} must be text`),
          { status: 400 }
        );
      }

      output[key] = body[key].trim();
    }
  }

  for (const key of required[kind]) {
    if (!output[key]) {
      throw Object.assign(
        new Error(`${key} is required`),
        { status: 400 }
      );
    }
  }

  if (kind === 'resources' && output.link) {
    try {
      const link = new URL(output.link);

      if (!['http:', 'https:'].includes(link.protocol)) {
        throw new Error('Invalid protocol');
      }
    } catch {
      throw Object.assign(
        new Error('Invalid http(s) URL'),
        { status: 400 }
      );
    }
  }

  return output;
}

// --------------------------------------------------
// DATABASE HEALTH CHECK
// --------------------------------------------------

app.get('/api/health', wrap(async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      status: 'degraded',
      database: 'disconnected'
    });
  }

  try {
    await mongoose.connection.db.admin().ping();

    return res.json({
      status: 'ok',
      database: 'connected'
    });
  } catch {
    return res.status(503).json({
      status: 'degraded',
      database: 'disconnected'
    });
  }
}));

// Reject database requests when Atlas is unavailable.
app.use(
  ['/api/topics', '/api/labs', '/api/resources'],
  (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        error: 'Database unavailable'
      });
    }

    next();
  }
);

// --------------------------------------------------
// MONGODB CRUD ROUTES
// --------------------------------------------------

for (const kind of Object.keys(fields)) {
  const url = `/api/${kind}`;
  const Model = models[kind];

  // READ
  app.get(url, wrap(async (req, res) => {
    res.json(
      await Model.find()
        .sort({ createdAt: -1 })
        .lean()
    );
  }));

  // CREATE
  app.post(url, wrap(async (req, res) => {
    res.status(201).json(
      await Model.create(sanitize(kind, req.body))
    );
  }));

  // UPDATE
  app.put(`${url}/:id`, wrap(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: 'Invalid ID'
      });
    }

    const record = await Model.findByIdAndUpdate(
      req.params.id,
      sanitize(kind, req.body),
      {
        new: true,
        runValidators: true
      }
    );

    if (!record) {
      return res.status(404).json({
        error: 'Record not found'
      });
    }

    res.json(record);
  }));

  // DELETE
  app.delete(`${url}/:id`, wrap(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        error: 'Invalid ID'
      });
    }

    const record = await Model.findByIdAndDelete(
      req.params.id
    );

    if (!record) {
      return res.status(404).json({
        error: 'Record not found'
      });
    }

    res.status(204).end();
  }));
}

// --------------------------------------------------
// YOUTUBE DATA API V3 INTEGRATION
// --------------------------------------------------

app.get('/api/youtube/search', wrap(async (req, res) => {
  const query = req.query.q;

  // Validate the search query.
  if (
    typeof query !== 'string' ||
    !query.trim() ||
    query.trim().length > 120
  ) {
    return res.status(400).json({
      error: 'q must be 1 to 120 characters'
    });
  }

  // Check that the private API key exists.
  if (!process.env.YOUTUBE_API_KEY) {
    return res.status(503).json({
      error: 'YouTube API not configured'
    });
  }

  // Construct the YouTube API request.
  const url = new URL(
    'https://www.googleapis.com/youtube/v3/search'
  );

  url.search = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    q: query.trim(),
    maxResults: '5',
    key: process.env.YOUTUBE_API_KEY
  }).toString();

  let response;
  let data;

  // Request video search results.
  try {
    response = await fetch(url, {
      signal: AbortSignal.timeout(10000)
    });

    data = await response.json();
  } catch (error) {
    console.error(
      'YouTube request failed:',
      error.name
    );

    return res.status(502).json({
      error: 'YouTube search unavailable'
    });
  }

  // Handle YouTube API errors.
  if (!response.ok) {
    console.error(
      'YouTube API returned HTTP',
      response.status
    );

    return res.status(502).json({
      error: 'YouTube search failed'
    });
  }

  // Format videos for Angular.
  const videos = (
    Array.isArray(data.items) ? data.items : []
  )
    .filter(item => item.id?.videoId)
    .map(item => ({
      videoId: item.id.videoId,

      title: item.snippet?.title || '',

      channel: item.snippet?.channelTitle || '',

      description: item.snippet?.description || '',

      publishedAt: item.snippet?.publishedAt || '',

      thumbnail:
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url ||
        '',

      url:
        `https://www.youtube.com/watch?v=${encodeURIComponent(item.id.videoId)}`
    }));

  res.json({ videos });
}));

// --------------------------------------------------
// EXPRESS ERROR HANDLER
// --------------------------------------------------

app.use((err, req, res, next) => {
  const status = err.status ||
    (
      ['ValidationError', 'StrictModeError'].includes(err.name)
        ? 400
        : 500
    );

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    error:
      status === 500
        ? 'Internal server error'
        : err.message
  });
});

// --------------------------------------------------
// START EXPRESS INDEPENDENTLY OF MONGODB
// --------------------------------------------------

app.listen(port, 'localhost', () => {
  console.log(
    `CyberStudy API listening on localhost:${port}`
  );
});

// Connect to MongoDB when available.
if (!process.env.MONGODB_URI) {
  console.warn(
    'MongoDB not configured; CRUD routes will return HTTP 503'
  );
} else {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  })
    .then(() => {
      console.log('MongoDB connected');
    })
    .catch(error => {
      console.warn(
        'MongoDB unavailable:',
        error.message
      );
    });
}
