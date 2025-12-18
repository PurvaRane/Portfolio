import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Analytics from './models/Analytics.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

/* =========================
   CORS — PRODUCTION FIX
   ========================= */
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allowed domains (localhost + production)
    const allowedDomains = [
      'http://localhost:5173',
      'http://localhost:3000'
    ];
    
    // Check if origin is in allowedDomains or is a Vercel deployment
    const isAllowed = allowedDomains.includes(origin) || origin.endsWith('.vercel.app');
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Explicitly handle preflight requests
app.options('*', cors());

app.use(express.json());

/* =========================
   MongoDB Connection
   ========================= */
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is missing in environment variables');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Don't exit process, allow server to run (analytics might fail but site shouldn't crash)
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
   START SERVER
   ========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
