// Analytics service for tracking page views

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.warn("⚠️ VITE_API_URL is missing! Analytics may not work.");
}

interface AnalyticsData {
  page?: string;
  userAgent?: string;
  referrer?: string;
  screenWidth?: number;
  screenHeight?: number;
}

export const trackPageView = async (data: AnalyticsData = {}): Promise<void> => {
  try {
    const analyticsData: AnalyticsData = {
      page: data.page || 'home',
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      ...data
    };

    const response = await fetch(`${API_URL}/api/analytics/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(analyticsData),
    });

    if (!response.ok) {
      console.warn('Analytics tracking failed:', response.statusText);
    }
  } catch (error) {
    // Silently fail - don't let analytics errors break the user experience
    console.warn('Analytics tracking error:', error);
  }
};

export const getAnalyticsSummary = async () => {
  try {
    const response = await fetch(`${API_URL}/api/analytics/summary`);
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
};
