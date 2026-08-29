import 'server-only';

const PLACES_API_BASE = 'https://places.googleapis.com/v1/places';
const GOOGLE_REVIEW_FIELD_MASK = 'id,displayName,rating,userRatingCount,reviews,googleMapsUri';

export interface LiveGoogleReview {
  authorName: string;
  authorUri: string | null;
  authorPhotoUri: string | null;
  rating: number;
  text: string;
  relativePublishTime: string | null;
  googleMapsUri: string;
}

export interface GoogleReviewsResult {
  status: 'live' | 'link-only' | 'unconfigured';
  displayName: string | null;
  rating: number | null;
  userRatingCount: number | null;
  reviews: LiveGoogleReview[];
  googleMapsUri: string | null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function asRating(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 1 && value <= 5
    ? value
    : null;
}

function asCount(value: unknown): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : null;
}

function safeHttpsUrl(value: unknown, allowedHosts?: (hostname: string) => boolean): string | null {
  const raw = asString(value);
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return null;
    if (allowedHosts && !allowedHosts(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function isGoogleHost(hostname: string) {
  return hostname === 'google.com' || hostname.endsWith('.google.com') || hostname === 'maps.app.goo.gl';
}

function sanitizeReview(value: unknown): LiveGoogleReview | null {
  const review = asRecord(value);
  const author = asRecord(review?.authorAttribution);
  const text = asRecord(review?.text);
  const authorName = asString(author?.displayName);
  const reviewText = asString(text?.text);
  const rating = asRating(review?.rating);
  const googleMapsUri = safeHttpsUrl(review?.googleMapsUri, isGoogleHost);

  if (!review || !authorName || !reviewText || rating === null || !googleMapsUri) return null;

  return {
    authorName,
    authorUri: safeHttpsUrl(author?.uri, isGoogleHost),
    authorPhotoUri: safeHttpsUrl(
      author?.photoUri,
      (hostname) => hostname === 'googleusercontent.com' || hostname.endsWith('.googleusercontent.com')
    ),
    rating,
    text: reviewText,
    relativePublishTime: asString(review.relativePublishTimeDescription) || null,
    googleMapsUri,
  };
}

function getConfiguredProfileUrl() {
  return safeHttpsUrl(process.env.GOOGLE_MAPS_PROFILE_URL, isGoogleHost);
}

function fallbackResult(status: 'link-only' | 'unconfigured'): GoogleReviewsResult {
  return {
    status,
    displayName: null,
    rating: null,
    userRatingCount: null,
    reviews: [],
    googleMapsUri: getConfiguredProfileUrl(),
  };
}

export async function fetchGoogleReviews(): Promise<GoogleReviewsResult> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = asString(process.env.GOOGLE_PLACE_ID);

  if (!apiKey || !placeId) {
    return fallbackResult(getConfiguredProfileUrl() ? 'link-only' : 'unconfigured');
  }

  try {
    const response = await fetch(`${PLACES_API_BASE}/${encodeURIComponent(placeId)}`, {
      headers: {
        Accept: 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': GOOGLE_REVIEW_FIELD_MASK,
      },
      // Fetched once at build time so pages using reviews stay fully static.
      // Reviews refresh on every deploy.
      cache: 'force-cache',
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`Google Places review request failed with status ${response.status}`);
      return fallbackResult(getConfiguredProfileUrl() ? 'link-only' : 'unconfigured');
    }

    const data = asRecord(await response.json());
    if (!data || asString(data.id) !== placeId) {
      console.error('Google Places review response did not match the configured place');
      return fallbackResult(getConfiguredProfileUrl() ? 'link-only' : 'unconfigured');
    }

    const displayName = asRecord(data.displayName);
    const reviews = Array.isArray(data.reviews)
      ? data.reviews.map(sanitizeReview).filter((review): review is LiveGoogleReview => review !== null)
      : [];
    const rating = asRating(data.rating);
    const userRatingCount = asCount(data.userRatingCount);
    const googleMapsUri = safeHttpsUrl(data.googleMapsUri, isGoogleHost) || getConfiguredProfileUrl();
    const hasLiveData = rating !== null || userRatingCount !== null || reviews.length > 0;

    return {
      status: hasLiveData ? 'live' : googleMapsUri ? 'link-only' : 'unconfigured',
      displayName: asString(displayName?.text) || null,
      rating,
      userRatingCount,
      reviews,
      googleMapsUri,
    };
  } catch (error) {
    console.error('Google Places review request failed', error instanceof Error ? error.message : 'Unknown error');
    return fallbackResult(getConfiguredProfileUrl() ? 'link-only' : 'unconfigured');
  }
}
