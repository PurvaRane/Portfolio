import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Analytics from './models/Analytics.js';

dotenv.config();

const app = express();

/* =========================
   CORS — FINAL FIX
   ========================= */
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://purvaraneportfolio.vercel.app'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 🔥 THIS LINE FIXES THE CORS ERROR
app.options('*', cors());

app.use(express.json());

/* =========================
   MongoDB
   ========================= */
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MongoDB URI not found');
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB error:', err.message);
  }
};

connectDB();

/* =========================
   ROUTES
   ========================= */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/analytics/view', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: false });
    }

    const data = new Analytics({
      page: req.body.page || 'home',
      userAgent: req.headers['user-agent'] || '',
      referrer: req.headers.referer || '',
      screenWidth: req.body.screenWidth || 0,
      screenHeight: req.body.screenHeight || 0,
      ipAddress: req.ip
    });

    await data.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

/* ===== Reviews ===== */
app.post('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: false });
    }

    const Review = (await import('./models/Review.js')).default;
    await new Review(req.body).save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const Review = (await import('./models/Review.js')).default;
    const data = await Review.find({ approved: true });
    res.json({ success: true, data });
  } catch {
    res.json({ success: true, data: [] });
  }
});

/* =========================
   START SERVER (Render SAFE)
   ========================= */
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
