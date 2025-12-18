import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Analytics from './models/Analytics.js';

dotenv.config();

const app = express();

/* ================================
   🔑 TRUST RENDER PROXY
================================ */
app.set('trust proxy', 1);

/* ================================
   ✅ CORS — RENDER + VERCEL SAFE
================================ */
app.use(cors({
  origin: true, // allow all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

/* ================================
   MongoDB
================================ */
async function connectDB() {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MongoDB URI not set');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
}

connectDB();

/* ================================
   Health Check
================================ */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ================================
   Analytics
================================ */
app.post('/api/analytics/view', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false });
    }

    await new Analytics({
      page: req.body.page || 'home',
      userAgent: req.headers['user-agent'] || '',
      referrer: req.headers.referer || '',
      screenWidth: req.body.screenWidth || 0,
      screenHeight: req.body.screenHeight || 0,
      ipAddress: req.ip,
    }).save();

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Analytics error:', err.message);
    res.status(500).json({ success: false });
  }
});

/* ================================
   Reviews
================================ */
app.post('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false });
    }

    const { name, role, message, rating } = req.body;
    if (!name || !message) {
      return res.status(400).json({ success: false });
    }

    const Review = (await import('./models/Review.js')).default;

    await new Review({
      name,
      role: role || '',
      message,
      rating: rating || 5,
      approved: false,
    }).save();

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Review error:', err.message);
    res.status(500).json({ success: false });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const Review = (await import('./models/Review.js')).default;
    const reviews = await Review.find({ approved: true }).sort({ timestamp: -1 });
    res.json({ success: true, data: reviews });
  } catch {
    res.status(500).json({ success: false });
  }
});

/* ================================
   START SERVER — RENDER SAFE
================================ */
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('❌ PORT not provided by Render');
}

app.listen(PORT, () => {
  console.log('🚀 Server running on Render-assigned port');
});
