'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Review {
  author: string;
  text: string;
}

interface ReviewTickerProps {
  rating?: number;
  totalReviews?: number;
  reviews?: Review[];
}

// Fallback reviews
const fallbackReviews: Review[] = [
  { author: "Michelle D.", text: "Fast service! Ten minutes and done." },
  { author: "Enrique P.", text: "Great service even near closing time!" },
  { author: "Carlos M.", text: "Best tire shop in San Diego!" },
  { author: "Maria R.", text: "Excellent service and reasonable prices." },
  { author: "David L.", text: "Quick, fair, and friendly. Highly recommend!" },
  { author: "Sarah T.", text: "Much better than the big chain stores." },
];

export function ReviewTicker({ rating = 5.0, totalReviews = 200, reviews = fallbackReviews }: ReviewTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
        setIsVisible(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [displayReviews.length]);

  const currentReview = displayReviews[currentIndex];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="hidden md:flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={i}
            className="h-3 w-3 fill-yellow-400 text-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
        )}
        <span className="font-semibold text-zinc-700 ml-1">{rating.toFixed(1)}</span>
        <span className="text-zinc-500">({totalReviews}+ reviews)</span>
      </div>
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-zinc-600">
          "{currentReview.text}" {currentReview.author && `- `}<span className="font-semibold">{currentReview.author}</span>
        </span>
      </div>
    </div>
  );
}
