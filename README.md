# CyberStudy — IT 6203 Milestone 3 (Group 5)

CyberStudy is a web application designed to help cybersecurity students organize study topics, track hands-on laboratory exercises, and maintain a collection of educational resources.

The application uses the MEAN stack: MongoDB, Express.js, Angular, and Node.js.

Milestone 3 extends the existing MongoDB CRUD application with an integration using **YouTube Data API v3**.

## 1. Project Overview

CyberStudy contains three main components:

### Study Topics
Allows users to create, view, update, and delete cybersecurity study topics, including difficulty, category, progress, and notes.

### Lab Tracker
Allows users to document technical exercises, track completion status, associate laboratories with study topics, and record tools used.

### Learning Resources
Allows users to save documentation, tutorials, courses, articles, and videos relevant to cybersecurity education.

### YouTube API Integration
The Express backend connects to YouTube Data API v3 to retrieve educational videos using search queries.

Search responses contain video titles, channels, descriptions, publication dates, thumbnails, and video URLs.

The Angular search interface and automatic search-result saving workflow remain pending frontend integration.

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Angular, TypeScript, HTML, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Third-party API | YouTube Data API v3 |
| Development environment | Visual Studio Code |
| Version control | Git and GitHub |

## 3. Repository

**GitHub:** https://github.com/itschawk-labs/cyberstudy

**Milestone 3 branch:** `milestone-3`

**Verified backend commit:** `19f616b9178e1231b07915903e0d3a54e11bc4c1`

The Milestone 3 backend is committed to GitHub. The frontend YouTube integration is being completed separately.

## 4. Local Installation

### Requirements

- Node.js 22 or a compatible version supporting built-in `fetch` and `AbortSignal.timeout`
- npm
- MongoDB Atlas or a local MongoDB instance
- A Google Cloud API key authorized to use YouTube Data API v3

### Install Backend Dependencies

From the repository root:

1. Navigate to `server/`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Configure the private environment variables.

### Environment Configuration

The private `server/.env` file should contain:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Express server port; default 8000 |
| `CLIENT_ORIGIN` | Allowed Angular origin |
| `YOUTUBE_API_KEY` | Private YouTube Data API v3 credential |
| `DNS_SERVERS` | Optional Node.js