'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const reviews = [
  { author: "Michelle D.", text: "Fast service! Ten minutes and done.", location: "El Cajon" },
  { author: "Enrique P.", text: "Great service even near closing time!", location: "El Cajon" },
  { author: "Carlos M.", text: "Best tire shop in San Diego!", location: "Downtown" },
  { author: "Maria R.", text: "Excellent service and reasonable prices.", location: "El Cajon" },
  { author: "David L.", text: "Quick, fair, and friendly. Highly recommend!", location: "Spring Valley" },
  { author: "Sarah T.", text: "Much better than the big chain stores.", location: "Lakeside" },
];

export function ReviewTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setIsVisible(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentReview = reviews[currentIndex];

  return (
    <div className="hidden md:flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-3 w-3 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-zinc-600">
          "{currentReview.text}" - <span className="font-semibold">{currentReview.author}</span>
        </span>
      </div>
    </div>
  );
}
