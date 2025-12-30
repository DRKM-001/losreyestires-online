'use client';

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  location?: string;
}

const reviews: Review[] = [
  {
    author: "Michelle D.",
    rating: 5,
    text: "Love this place, replaced my ruined tire for 40.00 installed and good used tire.. fast!! within ten minutes it was all done... friendly staff too.",
    date: "November 2024",
    location: "El Cajon"
  },
  {
    author: "Enrique P.",
    rating: 5,
    text: "I got a flat while driving late this afternoon. I arrived at their shop about 20 minutes before closing. They still took care of me quickly and professionally. Great service!",
    date: "September 2024",
    location: "El Cajon"
  },
  {
    author: "Carlos M.",
    rating: 5,
    text: "Best tire shop in San Diego! Great prices on used tires and the guys are always honest about what I need. Been coming here for years.",
    date: "December 2024",
    location: "Downtown San Diego"
  },
  {
    author: "Maria R.",
    rating: 5,
    text: "Excellent customer service and very reasonable prices. They explained everything clearly and had me back on the road in no time.",
    date: "October 2024",
    location: "El Cajon"
  },
  {
    author: "David L.",
    rating: 5,
    text: "Quick service, fair prices, and friendly staff. These guys know tires! Highly recommend for anyone in East County.",
    date: "November 2024",
    location: "Spring Valley"
  },
  {
    author: "Sarah T.",
    rating: 5,
    text: "Great experience! They had the tires I needed in stock and installed them same day. Much better than the big chain stores.",
    date: "December 2024",
    location: "Lakeside"
  },
];

export function GoogleReviews() {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = "200+"; // You can update this manually

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl font-bold">⭐ Google Reviews</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-3xl font-bold">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-muted-foreground">
              Based on {totalReviews} Google reviews
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                    "{review.text}"
                  </p>

                  {/* Author & Date */}
                  <div className="border-t pt-3">
                    <p className="font-semibold text-sm">{review.author}</p>
                    {review.location && (
                      <p className="text-xs text-muted-foreground">{review.location}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://www.google.com/search?q=Los+Reyes+Tires+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
            >
              Read all reviews on Google →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
