export interface GoogleReview {
  author: string;
  text: string;
  rating: number;
}

export interface ReviewData {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

export async function fetchGoogleReviews(): Promise<ReviewData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('Google Places API not configured, using fallback data');
    return {
      rating: 5.0,
      totalReviews: 200,
      reviews: [],
    };
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&key=${apiKey}`,
      { cache: 'no-store' }
    );

    const data = await response.json();

    if (data.status !== 'OK') {
      console.error('Google Places API error:', data.status, data.error_message);
      return {
        rating: 5.0,
        totalReviews: 200,
        reviews: [],
      };
    }

    const reviews = (data.result.reviews || [])
      .filter((r: any) => r.rating >= 4)
      .map((r: any) => ({
        author: r.author_name,
        text: r.text.length > 80 ? r.text.substring(0, 77) + '...' : r.text,
        rating: r.rating,
      }));

    return {
      rating: data.result.rating || 5.0,
      totalReviews: data.result.user_ratings_total || 200,
      reviews,
    };
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return {
      rating: 5.0,
      totalReviews: 200,
      reviews: [],
    };
  }
}
