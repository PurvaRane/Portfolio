import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: '',
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5
  },
  approved: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
reviewSchema.index({ approved: 1, timestamp: -1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
