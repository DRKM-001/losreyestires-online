import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone } from 'lucide-react';

interface ProductQuantityProps {
  inStock: boolean;
}

export function ProductQuantity({ inStock }: ProductQuantityProps) {
  return (
    <div className="mb-6">
      <p className="mb-4 text-sm text-zinc-600">
        {inStock
          ? 'Contact the shop to confirm current availability, fitment, and installed pricing.'
          : 'Contact the shop and we will help find the closest available option.'}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button asChild size="lg" className="h-12 bg-red-600 font-bold hover:bg-red-700">
          <Link href="/#quote">
            <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
            Check Availability
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="h-12 font-bold">
          <a href="tel:619-440-6098">
            <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
            Call the Shop
          </a>
        </Button>
      </div>
    </div>
  );
}
