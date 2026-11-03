import Image from 'next/image';
import { ExternalLink, Star } from 'lucide-react';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { site } from '@/lib/site';
import { fetchGoogleReviews, type LiveGoogleReview } from '@/lib/google-reviews';

function ReviewAuthor({ review }: { review: LiveGoogleReview }) {
  const name = review.authorUri ? (
    <a
      href={review.authorUri}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-sand-50 hover:underline"
    >
      {review.authorName}
      <span className="sr-only"> on Google Maps (opens in a new tab)</span>
    </a>
  ) : (
    <span className="font-bold text-sand-50">{review.authorName}</span>
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
        {review.relativePublishTime && <p className="mt-0.5 text-blaze-100/70">{review.relativePublishTime}</p>}
      </div>
    </div>
  );
}

export async function GoogleReviews() {
  const data = await fetchGoogleReviews();

  if (data.status !== 'live') {
    if (!data.googleMapsUri) return null;

    return (
      <aside className="relative overflow-hidden bg-blaze-700 text-sand-50" aria-label="Los Reyes Tires on Google Maps">
        <div className="absolute inset-0 bg-grain opacity-[0.06]" />
        <div className="container-x relative flex flex-col items-start justify-between gap-5 py-12 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-100">Local feedback</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">See what El Cajon says</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={data.googleMapsUri} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 font-bold uppercase tracking-wide text-blaze-700 hover:bg-blaze-50">
              <GoogleIcon className="h-5 w-5" />Read our Google reviews<ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={site.reviewHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-sand-50/30 px-5 py-3 font-bold uppercase tracking-wide text-sand-50 hover:bg-sand-50/10">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />Leave a review
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </aside>
    );
  }

  const visibleReviews = data.reviews.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-blaze-700 py-20 text-sand-50" aria-labelledby="google-reviews-heading">
      <div className="absolute inset-0 bg-grain opacity-[0.06]" />
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-100">Local feedback</p>
            <h2 id="google-reviews-heading" className="mt-3 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">What El Cajon says</h2>
          </div>
          {data.googleMapsUri && (
            <a href={data.googleMapsUri} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border border-sand-50/15 bg-ink-950/20 px-5 py-3 hover:bg-ink-950/30">
              {data.rating !== null && <span className="font-display text-5xl font-bold leading-none">{data.rating.toFixed(1)}</span>}
              <span>
                <span className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />)}</span>
                <span className="flex items-center gap-1.5 text-sm text-blaze-100">
                  <GoogleIcon className="h-4 w-4" />
                  {data.userRatingCount !== null ? `${data.userRatingCount.toLocaleString()} Google ratings` : 'View on Google Maps'}
                </span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>

        {visibleReviews.length > 0 && (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {visibleReviews.map((review) => (
              <figure key={review.googleMapsUri} className="flex flex-col rounded-xl border border-sand-50/10 bg-ink-950/25 p-6">
                <span className="flex gap-0.5" aria-label={`${review.rating.toFixed(1)} out of 5`}>
                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-4 w-4 ${i < Math.round(review.rating) ? 'fill-amber-400 text-amber-400' : 'text-sand-50/30'}`} aria-hidden="true" />)}
                </span>
                <blockquote className="mt-4 line-clamp-6 flex-1 text-[15px] leading-relaxed text-sand-50/95">
                  <p>{review.text}</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-sand-50/10 pt-4">
                  <ReviewAuthor review={review} />
                  <a href={review.googleMapsUri} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blaze-100 hover:text-white hover:underline">
                    View on Google Maps<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <p className="mt-6 text-xs leading-5 text-blaze-100/70">
          Google Maps content. {visibleReviews.length > 0 && 'Showing the first reviews in the order returned by Google Maps. '}
          Reviews reflect individual customer opinions.
        </p>
      </div>
    </section>
  );
}
