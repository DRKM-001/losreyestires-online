import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Newsletter() {
  return (
    <section className="bg-gradient-to-br from-red-600 to-red-700 text-white" aria-labelledby="shop-help-heading">
      <div className="container py-7">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-5 md:flex-row">
          <div className="text-center md:text-left">
            <h2 id="shop-help-heading" className="text-xl font-bold">Need help finding the right option?</h2>
            <p className="mt-1 text-sm text-red-100">Ask the El Cajon team to check current availability.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild className="bg-white font-bold text-red-700 hover:bg-red-50">
              <Link href="/#quote">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Check Availability
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-white bg-transparent font-bold text-white hover:bg-white hover:text-red-700">
              <a href="tel:619-440-6098">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call the Shop
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
