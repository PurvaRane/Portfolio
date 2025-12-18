import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Analytics from './models/Analytics.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://purvaraneportfolio.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Explicitly handle preflight requests
app.options('*', cors());


app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️  MongoDB URI not found. Running without database.');
      console.log('   Set MONGODB_URI in .env to enable analytics tracking.');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('   Server will run without database functionality.');
  }
};

connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Portfolio backend is running',
    dbConnected: mongoose.connection.readyState === 1
  });
});

// Analytics endpoint - Track page views
app.post('/api/analytics/view', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false, 
        message: 'Database not connected' 
      });
    }

    const { page, userAgent, referrer, screenWidth, screenHeight } = req.body;
    
    const analyticsData = new Analytics({
      page: page || 'home',
      userAgent: userAgent || req.headers['user-agent'] || '',
      referrer: referrer || req.headers['referer'] || '',
      screenWidth: screenWidth || 0,
      screenHeight: screenHeight || 0,
      ipAddress: req.ip || req.connection.remoteAddress || ''
    });

    await analyticsData.save();
    
    res.json({ 
      success: true, 
      message: 'Analytics recorded successfully' 
    });
  } catch (error) {
    console.error('Error saving analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to record analytics',
      error: error.message 
    });
  }
});

// Get analytics summary (for your reference)
app.get('/api/analytics/summary', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false, 
        message: 'Database not connected' 
      });
    }

    const totalViews = await Analytics.countDocuments();
    const todayViews = await Analytics.countDocuments({
      timestamp: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });
    
    const recentViews = await Analytics.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('page timestamp userAgent referrer');

    res.json({
      success: true,
      data: {
        totalViews,
        todayViews,
        recentViews
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch analytics',
      error: error.message 
    });
  }
});

// ============================================
// REVIEWS ENDPOINTS
// ============================================

// Submit a new review
app.post('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false, 
        message: 'Database not connected' 
      });
    }

    const { name, role, message, rating } = req.body;
    
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name and message are required'
      });
    }

    const Review = (await import('./models/Review.js')).default;
    
    const review = new Review({
      name,
      role: role || '',
      message,
      rating: rating || 5,
      approved: false // Reviews need approval by default
    });

    await review.save();
    
    res.json({ 
      success: true, 
      message: 'Review submitted successfully. It will appear after approval.' 
    });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit review',
      error: error.message 
    });
  }
});

// Get approved reviews (public endpoint)
app.get('/api/reviews', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false, 
        message: 'Database not connected' 
      });
    }

    const Review = (await import('./models/Review.js')).default;
    
    const reviews = await Review.find({ approved: true })
      .sort({ timestamp: -1 })
      .limit(20)
      .select('name role message rating timestamp');

    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch reviews',
      error: error.message 
    });
  }
});

// Get all reviews including pending (for admin/your use)
app.get('/api/reviews/all', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ 
        success: false, 
        message: 'Database not connected' 
      });
    }

    const Review = (await import('./models/Review.js')).default;
    
    const reviews = await Review.find()
      .sort({ timestamp: -1 })
      .select('name role message rating approved timestamp');

    res.json({
      success: true,
      data: reviews,
      stats: {
        total: reviews.length,
        approved: reviews.filter(r => r.approved).length,
        pending: reviews.filter(r => !r.approved).length
      }
    });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch reviews',
      error: error.message 
    });
  }
});

// Start server with error handling
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error(`   Please stop the existing server or change the PORT in .env`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err.message);
    process.exit(1);
  }
});


