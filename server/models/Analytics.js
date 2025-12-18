import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    default: 'home'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  referrer: {
    type: String,
    default: ''
  },
  screenWidth: {
    type: Number,
    default: 0
  },
  screenHeight: {
    type: Number,
    default: 0
  },
  ipAddress: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for efficient querying by date
analyticsSchema.index({ timestamp: -1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
