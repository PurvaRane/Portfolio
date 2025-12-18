// Reviews service for submitting and fetching reviews

interface ReviewData {
  name: string;
  role?: string;
  message: string;
  rating: number;
}

export const submitReview = async (data: ReviewData): Promise<boolean> => {
  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Error submitting review:', error);
    return false;
  }
};

export const getApprovedReviews = async () => {
  try {
    const response = await fetch('/api/reviews');
    if (!response.ok) {
      return [];
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
};

export const getAllReviews = async () => {
  try {
    const response = await fetch('/api/reviews/all');
    if (!response.ok) {
      return [];
    }
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    return [];
  }
};
