import 'dotenv/config';
import dns from 'node:dns';
// Optional per-process DNS workaround; only used if DNS_SERVERS is set privately.
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(',').map(v => v.trim()).filter(Boolean));
}
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const app=express();const port=Number(process.env.PORT||8000);
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:4200'}));app.use(express.json({limit:'50kb'}));
const fields={topics:['topicName','category','description','difficulty','status','notes'],labs:['title','relatedTopic','description','tools','labDate','status','notes'],resources:['title','type','relatedTopic','description','link','notes']};
const required={topics:['topicName','category','difficulty','status'],labs:['title','status'],resources:['title','type']};
const models={};
for(const [kind,keys] of Object.entries(fields)){const schema={};for(const key of keys)schema[key]={type:String,trim:true,maxlength:2000,required:required[kind].includes(key)};models[kind]=mongoose.model(kind,new mongoose.Schema(schema,{timestamps:true,strict:'throw'}));}
const wrap=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
const sanitize=(kind,body)=>{if(!body||typeof body!=='object'||Array.isArray(body))throw Object.assign(new Error('Object required'),{status:400});const output={};for(const key of fields[kind])if(body[key]!==undefined){if(typeof body[key]!=='string')throw Object.assign(new Error(key+' must be text'),{status:400});output[key]=body[key].trim();}for(const key of required[kind])if(!output[key])throw Object.assign(new Error(key+' is required'),{status:400});if(kind==='resources'&&output.link){try{const u=new URL(output.link);if(!['http:','https:'].includes(u.protocol))throw Error();}catch{throw Object.assign(new Error('Invalid http(s) URL'),{status:400});}}return output;};
app.get('/api/health',wrap(async(req,res)=>{await mongoose.connection.db.admin().ping();res.json({status:'ok',database:'connected'});}));
for(const kind of Object.keys(fields)){const url='/api/'+kind,Model=models[kind];
 app.get(url,wrap(async(req,res)=>res.json(await Model.find().sort({createdAt:-1}).lean())));
 app.post(url,wrap(async(req,res)=>res.status(201).json(await Model.create(sanitize(kind,req.body)))));
 app.put(url+'/:id',wrap(async(req,res)=>{if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({error:'Invalid ID'});const record=await Model.findByIdAndUpdate(req.params.id,sanitize(kind,req.body),{new:true,runValidators:true});if(!record)return res.status(404).json({error:'Record not found'});res.json(record);}));
 app.delete(url+'/:id',wrap(async(req,res)=>{if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({error:'Invalid ID'});const record=await Model.findByIdAndDelete(req.params.id);if(!record)return res.status(404).json({error:'Record not found'});res.status(204).end();}));}
app.use((err,req,res,next)=>{const status=err.status||(['ValidationError','StrictModeError'].includes(err.name)?400:500);if(status===500)console.error(err);res.status(status).json({error:status===500?'Internal server error':err.message});});
if(!process.env.MONGODB_URI){console.error('Set MONGODB_URI in server/.env');process.exit(1);}
try{await mongoose.connect(process.env.MONGODB_URI);app.listen(port,()=>console.log('CyberStudy API listening on '+port));}catch(err){console.error('MongoDB connection failed:',err.message);process.exit(1);}
