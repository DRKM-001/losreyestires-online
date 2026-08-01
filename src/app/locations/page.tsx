import Link from 'next/link';
import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'El Cajon Tire Shop Location',
  description: 'Visit Los Reyes Tires at 1245 N 1st St, El Cajon, CA 92021. Open Monday-Saturday 7 AM-7 PM and Sunday 8 AM-3 PM. Call 619-440-6098.',
  path: '/locations',
  keywords: ['tire shop El Cajon', 'Los Reyes Tires location', 'tires near El Cajon'],
});

const directionsUrl = 'https://maps.google.com/?q=1245+N+1st+St+El+Cajon+CA+92021';

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <section className="border-b bg-white py-10 sm:py-14">
        <div className="container">
          <div className="max-w-3xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">El Cajon, California</p>
            <h1 className="text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">Visit Los Reyes Tires</h1>
            <p className="mt-4 text-lg leading-8 text-zinc-600">Call ahead to discuss what you need or stop by during shop hours.</p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container">
          <Card className="mx-auto max-w-4xl overflow-hidden border-zinc-200 shadow-sm">
            <CardContent className="grid gap-8 p-5 sm:p-7 md:grid-cols-2 md:p-10">
              <div>
                <h2 className="text-2xl font-black text-zinc-900">Los Reyes Tires — El Cajon</h2>
                <div className="mt-6 space-y-3 text-zinc-700">
                  <div className="flex min-h-14 items-start gap-3 rounded-lg bg-zinc-50 p-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <p>1245 N 1st St<br />El Cajon, CA 92021</p>
                  </div>
                  <div className="flex min-h-14 items-center gap-3 rounded-lg bg-zinc-50 p-3">
                    <Phone className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <a className="inline-flex min-h-11 items-center font-bold hover:text-red-600" href="tel:619-440-6098">619-440-6098</a>
                  </div>
                  <div className="flex min-h-14 items-start gap-3 rounded-lg bg-zinc-50 p-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
                    <div>
                      <p>Monday–Saturday: 7:00 AM–7:00 PM</p>
                      <p>Sunday: 8:00 AM–3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-3">
                <Button asChild size="lg" className="h-12 bg-red-600 font-bold hover:bg-red-700">
                  <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="h-5 w-5" aria-hidden="true" />
                    Get Directions
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 font-bold">
                  <a href="tel:619-440-6098">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    Call the Shop
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 font-bold">
                  <a href="https://wa.me/16197299468" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    WhatsApp the Shop
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 font-bold">
                  <Link href="/#quote">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Check Availability
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
