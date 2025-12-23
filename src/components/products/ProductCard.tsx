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
    <Card className="group overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-zinc-100">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {!product.inStock && (
              <Badge className="bg-red-600 font-semibold text-xs">Out of Stock</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-red-600 font-semibold text-xs">
                Save {discount}%
              </Badge>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="flex-1 p-4">
        <Link href={`/products/${product.id}`}>
          <div className="mb-3">
            <p className="text-xs text-zinc-500 font-semibold mb-1">{product.brand}</p>
            <h3 className="font-semibold text-sm line-clamp-2 text-zinc-900">
              {product.name}
            </h3>
          </div>

          {product.size && (
            <p className="text-xs text-zinc-600 mb-2">{product.size}</p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          {product.salePrice ? (
            <>
              <span className="text-xl font-bold text-red-600">${product.salePrice.toFixed(2)}</span>
              <span className="text-sm text-zinc-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-zinc-900">${product.price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          className={`w-full font-semibold text-sm ${
            product.inStock 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-zinc-400'
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
