'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface ProductGalleryProps {
  images: string[];
  productName: string;
  discount: number;
  inStock: boolean;
}

export function ProductGallery({ images, productName, discount, inStock }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="relative aspect-square bg-zinc-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
        {discount > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-600 font-bold">
            Save {discount}%
          </Badge>
        )}
        {!inStock && (
          <Badge className="absolute top-4 left-4 bg-zinc-800 font-bold">
            Out of Stock
          </Badge>
        )}
      </div>
      
      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-zinc-100 rounded-md overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-red-600' 
                  : 'border-transparent hover:border-zinc-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - View ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
