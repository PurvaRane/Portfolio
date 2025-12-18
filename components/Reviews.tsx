
import React, { useState, useEffect } from 'react';
import { submitReview, getApprovedReviews } from '../services/reviews';

interface Review {
  _id?: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  timestamp?: Date;
}

const Reviews: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const fetchedReviews = await getApprovedReviews();
    setReviews(fetchedReviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const success = await submitReview(formData);
    
    if (success) {
      setSubmitStatus('success');
      setFormData({ name: '', role: '', message: '', rating: 5 });
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } else {
      setSubmitStatus('error');
    }
    
    setIsSubmitting(false);
  };

  const StarRating = ({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onChange && onChange(star)}
            disabled={!interactive}
            className={`text-2xl transition-all ${
              star <= rating 
                ? 'text-yellow-400' 
                : 'text-slate-700'
            } ${interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
        Recommendations & Reviews
      </h2>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        Your feedback helps me improve. Share your thoughts and recommendations!
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto">
        {/* Submit Review Form - Left Side on Desktop, Top on Mobile */}
        <div className="w-full lg:w-1/3 sticky top-24">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-blue-400 mb-6">Leave a Review</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition"
                  placeholder="First Last"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Role/Position
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition"
                  placeholder="Role/Position"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Recommendation *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-blue-500 transition resize-none"
                  placeholder="Share your thoughts..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Rating
                </label>
                <StarRating 
                  rating={formData.rating} 
                  interactive={true}
                  onChange={(rating) => setFormData({ ...formData, rating })}
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-900/30 border border-green-700 text-green-400 px-4 py-3 rounded-lg text-sm">
                  Thank you! Your review has been submitted successfully.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-900/30 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
                  Something went wrong. Please try again later.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>

        {/* Reviews List - Right Side on Desktop, Bottom on Mobile */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <div 
                key={review._id || index} 
                className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-200">{review.name}</h4>
                    {review.role && (
                      <p className="text-sm text-blue-400">{review.role}</p>
                    )}
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  "{review.message}"
                </p>
                {review.timestamp && (
                   <p className="text-xs text-slate-600 mt-4 text-right">
                     {new Date(review.timestamp).toLocaleDateString()}
                   </p>
                )}
              </div>
            ))}
            
            {reviews.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-slate-800 border-dashed">
                <p>No reviews yet. Be the first to share your experience!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
