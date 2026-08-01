'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  listName?: string;   // e.g., "All-Terrain Tires", "Search Results"
  index?: number;      // Position in the list
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl border-zinc-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        {/* Image Container - 6:5 aspect ratio (slightly wider than tall) */}
        <div className="relative aspect-[6/5] overflow-hidden border-b border-zinc-100 bg-zinc-50">
          {product.images[0] && product.images[0] !== '/placeholder-tire.jpg' ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center space-y-3">
                {/* Tire Icon SVG */}
                <svg 
                  className="w-24 h-24 mx-auto text-zinc-300" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="5" y1="5" x2="7.5" y2="7.5" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="16.5" y1="16.5" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="5" y1="19" x2="7.5" y2="16.5" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="16.5" y1="7.5" x2="19" y2="5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <div>
                  <p className="text-sm font-bold text-zinc-900 mb-0.5">{product.brand}</p>
                  <p className="text-xs text-zinc-500 font-medium">Image Coming Soon</p>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>

      <CardContent className="flex-1 p-4 space-y-2">
        <div>
          {/* Brand */}
          <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          
          {/* Product Name */}
          <h3 className="font-bold text-base line-clamp-2 text-zinc-900 mb-2 leading-tight">
            {product.name}
          </h3>

          {/* Tire Size */}
          {product.size && (
            <div className="inline-block bg-zinc-100 px-2 py-1 rounded text-xs font-semibold text-zinc-700 mb-2">
              {product.size}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="pt-1">
          {product.price > 0 ? (
            <span className="text-2xl font-black text-zinc-900">
              ${product.price.toFixed(2)}
            </span>
          ) : (
            <span className="text-base font-bold text-zinc-900">Ask for current pricing</span>
          )}
          <p className="mt-1 text-xs leading-5 text-zinc-500">
            {product.price > 0 ? 'Listed price · confirm with the shop' : 'Pricing is not listed for this item'}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild size="lg" className="h-12 w-full bg-red-600 font-bold hover:bg-red-700">
          <Link href="/#quote">
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
            Check Availability
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
