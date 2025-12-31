'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';

interface ProductQuantityProps {
  inStock: boolean;
}

export function ProductQuantity({ inStock }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center border-2 rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(-1)}
            className="h-10 px-3"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 font-bold">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(1)}
            className="h-10 px-3"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <span className="text-sm text-zinc-600">
          {quantity > 1 ? `Set of ${quantity} tires` : '1 tire'}
        </span>
      </div>

      <Button
        size="lg"
        disabled={!inStock}
        className={`w-full h-14 text-lg font-bold ${
          inStock
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-zinc-400'
        }`}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {inStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>

      {inStock && (
        <p className="text-sm text-green-600 font-semibold mt-2 flex items-center gap-1">
          <Check className="h-4 w-4" />
          In Stock - Ships within 1-2 business days
        </p>
      )}
    </div>
  );
}
