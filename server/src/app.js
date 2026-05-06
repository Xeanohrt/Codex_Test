import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import chapterRoutes from './routes/chapter.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(process.env.UPLOADS_DIR || 'uploads'));
app.use('/api/chapters', chapterRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, message: 'PhD Wiki API is healthy.' });
});

export const connectMongo = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/phd-wiki');
};

export default app;
