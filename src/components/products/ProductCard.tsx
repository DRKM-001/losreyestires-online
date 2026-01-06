import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden h-full flex flex-col transition-all hover:shadow-xl border-zinc-200">
      <Link href={`/products/${product.id}`} className="relative">
        {/* Image Container - More square aspect ratio */}
        <div className="relative aspect-[5/6] overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-6 transition-transform group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">🛞</div>
                <p className="text-xs text-zinc-400 font-medium">No Image</p>
              </div>
            </div>
          )}
          
          {/* Status Badges - Top Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <Badge className="bg-red-600 hover:bg-red-600 font-bold text-xs shadow-md">
                -{discount}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="bg-zinc-900 hover:bg-zinc-900 text-white font-bold text-xs shadow-md">
                Sold Out
              </Badge>
            )}
            {product.inStock && product.features?.some(f => f.includes('in stock')) && (
              <Badge className="bg-green-600 hover:bg-green-600 font-bold text-xs shadow-md">
                In Stock
              </Badge>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="flex-1 p-4 space-y-2">
        <Link href={`/products/${product.id}`}>
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
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-zinc-200 text-zinc-200'
                  }`}
                />
              ))}
            </div>
            {product.reviewCount > 0 && (
              <span className="text-xs text-zinc-500 font-medium">
                ({product.reviewCount})
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="pt-1">
          {product.salePrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-red-600">
                ${product.salePrice.toFixed(2)}
              </span>
              <span className="text-sm text-zinc-400 line-through font-medium">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-black text-zinc-900">
              ${product.price.toFixed(2)}
            </span>
          )}
          <p className="text-xs text-zinc-500 mt-0.5">per tire</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          size="lg"
          className={`w-full font-bold ${
            product.inStock 
              ? 'bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg' 
              : 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
          }`}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
}
