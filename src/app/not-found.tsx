import Link from 'next/link';
import { Home, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="bg-zinc-50 py-20 sm:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl rounded-xl border bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-red-600">404</p>
          <h1 className="text-3xl font-black text-zinc-900 sm:text-4xl">We could not find that page</h1>
          <p className="mx-auto mt-4 max-w-xl text-zinc-600">
            The link may be outdated. You can return home, check current tire availability, or contact the El Cajon shop directly.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button asChild className="h-11 bg-red-600 font-bold hover:bg-red-700">
              <Link href="/#quote">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Check Availability
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 font-bold">
              <a href="tel:619-440-6098">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call 619-440-6098
              </a>
            </Button>
            <Button asChild variant="outline" className="h-11 font-bold">
              <Link href="/">
                <Home className="h-4 w-4" aria-hidden="true" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 font-bold">
              <Link href="/locations">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                El Cajon Shop
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
