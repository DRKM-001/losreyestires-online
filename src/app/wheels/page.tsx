import Link from 'next/link';
import { MapPin, MessageCircle, Phone, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Wheel Options in El Cajon',
  description: 'Contact Los Reyes Tires to ask about current wheel options in El Cajon, CA. Call 619-440-6098 or request availability online.',
  path: '/wheels',
  keywords: ['wheels El Cajon', 'wheel options El Cajon', 'custom wheels El Cajon'],
});

export default function WheelsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <section className="bg-gradient-to-br from-zinc-950 to-zinc-800 py-16 text-white md:py-20">
        <div className="container">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-red-400">Wheel inquiries</p>
            <h1 className="text-4xl font-black md:text-5xl">Find the right wheel setup with local help</h1>
            <p className="mt-5 text-lg text-zinc-300 md:text-xl">
              Tell us about your vehicle and the look or use you have in mind. Our El Cajon team will check current options and help with fitment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-red-600 font-bold hover:bg-red-700">
                <Link href="/#quote">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Check Wheel Availability
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent font-bold text-white hover:bg-white hover:text-zinc-900">
                <a href="tel:619-440-6098">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call 619-440-6098
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-7">
                <Wrench className="h-8 w-8 text-red-600" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-black">Start with your vehicle</h2>
                <p className="mt-3 text-zinc-600">
                  Share the year, make, model, current tire size, and how you use the vehicle. We will help narrow the wheel options to discuss.
                </p>
                <Button asChild variant="link" className="mt-3 h-auto p-0 font-bold text-red-600">
                  <Link href="/#quote">Send vehicle details →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-7">
                <MapPin className="h-8 w-8 text-red-600" aria-hidden="true" />
                <h2 className="mt-4 text-2xl font-black">Talk with the local team</h2>
                <p className="mt-3 text-zinc-600">
                  Visit the El Cajon shop or call before you drive over to confirm current availability and discuss your setup.
                </p>
                <Button asChild variant="link" className="mt-3 h-auto p-0 font-bold text-red-600">
                  <Link href="/locations">Location and hours →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
