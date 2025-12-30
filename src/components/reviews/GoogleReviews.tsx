'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const totalReviews = "200+";

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsVisible(true);
      }, 500); // Wait for fade out before changing review
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const currentReview = reviews[currentIndex];

  return (
    <section className="py-16 bg-zinc-50">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-2xl font-bold">5.0</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {totalReviews} Google reviews
            </p>
          </div>

          {/* Single Review with Fade Animation */}
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center px-6">
              {/* Review Text */}
              <p className="text-lg md:text-xl text-muted-foreground italic mb-6 leading-relaxed">
                "{currentReview.text}"
              </p>

              {/* Author Info */}
              <div className="space-y-1">
                <p className="font-semibold text-base">{currentReview.author}</p>
                {currentReview.location && (
                  <p className="text-sm text-muted-foreground">{currentReview.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsVisible(true);
                  }, 300);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                }`}
                aria-label={`View review ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <a
              href="https://www.google.com/search?q=Los+Reyes+Tires+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline font-medium"
            >
              Read all reviews on Google →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
