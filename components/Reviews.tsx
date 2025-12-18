
import React, { useState } from 'react';
import { submitReview } from '../services/reviews';

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
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
        Recommendations & Reviews
      </h2>
      <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
        Your feedback helps me improve. Share your thoughts and recommendations!
      </p>

      <div className="max-w-2xl mx-auto">
        {/* Submit Review Form */}
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
    </div>
  );
};

export default Reviews;
