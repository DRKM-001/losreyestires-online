import Image from 'next/image';
import { ExternalLink, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { fetchGoogleReviews, type LiveGoogleReview } from '@/lib/google-reviews';

function ReviewAuthor({ review }: { review: LiveGoogleReview }) {
  const name = review.authorUri ? (
    <a
      href={review.authorUri}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-zinc-900 hover:text-red-700 hover:underline"
    >
      {review.authorName}
      <span className="sr-only"> on Google Maps (opens in a new tab)</span>
    </a>
  ) : (
    <span className="font-bold text-zinc-900">{review.authorName}</span>
  );

  return (
    <div className="flex items-center gap-3">
      {review.authorPhotoUri && (
        <Image
          src={review.authorPhotoUri}
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
      )}
      <div className="min-w-0 text-sm">
        <p className="truncate">{name}</p>
        {review.relativePublishTime && <p className="mt-0.5 text-zinc-500">{review.relativePublishTime}</p>}
      </div>
    </div>
  );
}

export async function GoogleReviews() {
  const data = await fetchGoogleReviews();

  if (data.status !== 'live') {
    if (!data.googleMapsUri) return null;

    return (
      <aside className="border-b bg-white" aria-label="Los Reyes Tires on Google Maps">
        <div className="container flex min-h-14 items-center justify-center py-2">
          <a
            href={data.googleMapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-zinc-700 hover:text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
          >
            <GoogleIcon className="h-5 w-5" />
            View Los Reyes Tires on Google Maps
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </aside>
    );
  }

  const visibleReviews = data.reviews.slice(0, 3);

  return (
    <section className="border-b bg-white py-10 sm:py-12" aria-labelledby="google-reviews-heading">
      <div className="container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">Local feedback</p>
            <h2 id="google-reviews-heading" className="text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
              Reviews from Google Maps
            </h2>
            {(data.rating !== null || data.userRatingCount !== null) && (
              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
                {data.rating !== null && (
                  <span className="inline-flex items-center gap-1 font-bold text-zinc-900">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" aria-hidden="true" />
                    {data.rating.toFixed(1)}
                  </span>
                )}
                {data.userRatingCount !== null && <span>from {data.userRatingCount.toLocaleString()} ratings</span>}
              </p>
            )}
          </div>
          {data.googleMapsUri && (
            <a
              href={data.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 self-start text-sm font-bold text-zinc-700 hover:text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 sm:self-auto"
            >
              <GoogleIcon className="h-5 w-5" />
              View on Google Maps
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>

        {visibleReviews.length > 0 && (
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {visibleReviews.map((review) => (
              <Card key={review.googleMapsUri} className="gap-4 border-zinc-200 py-5 shadow-sm">
                <CardContent className="flex h-full flex-col px-5">
                  <ReviewAuthor review={review} />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
                    {review.rating.toFixed(1)} out of 5
                  </p>
                  <blockquote className="mt-3 flex-1 text-sm leading-6 text-zinc-700">
                    <p>{review.text}</p>
                  </blockquote>
                  <a
                    href={review.googleMapsUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 border-t border-zinc-100 pt-3 text-sm font-bold text-zinc-600 hover:text-red-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                  >
                    View this review on Google Maps
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <p className="mt-5 text-xs leading-5 text-zinc-500">
          Google Maps content. {visibleReviews.length > 0 && 'Showing the first reviews in the order returned by Google Maps. '}
          Reviews reflect individual customer opinions.
        </p>
      </div>
    </section>
  );
}
