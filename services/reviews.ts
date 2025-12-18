// Reviews service for submitting and fetching reviews

const API_URL = import.meta.env.VITE_API_URL;

interface ReviewData {
  name: string;
  role?: string;
  message: string;
  rating: number;
}

export const submitReview = async (data: ReviewData): Promise<boolean> => {
  try {
    if (!API_URL) {
      console.error('❌ VITE_API_URL is not defined');
      return false;
    }

    const response = await fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('❌ Error submitting review:', error);
    return false;
  }
};

export const getApprovedReviews = async () => {
  try {
    if (!API_URL) {
      console.error('❌ VITE_API_URL is not defined');
      return [];
    }

    const response = await fetch(`${API_URL}/api/reviews`);
    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching reviews:', error);
    return [];
  }
};

export const getAllReviews = async () => {
  try {
    if (!API_URL) {
      console.error('❌ VITE_API_URL is not defined');
      return [];
    }

    const response = await fetch(`${API_URL}/api/reviews/all`);
    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('❌ Error fetching all reviews:', error);
    return [];
  }
};
