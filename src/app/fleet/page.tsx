import Link from 'next/link';
import { Building2, CheckCircle2, CircleDot, ClipboardList, MessageCircle, Phone, Route, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Fleet Tire Service in El Cajon',
  description: 'Talk with Los Reyes Tires about tire support for your local business vehicles or fleet. Share your vehicle types, tire sizes, and service needs for a direct availability conversation.',
  path: '/fleet',
  keywords: ['fleet tire service El Cajon', 'commercial fleet tires San Diego', 'business vehicle tires El Cajon'],
});

const phoneHref = 'tel:619-440-6098';
const whatsAppHref = 'https://wa.me/16197299468';

const serviceCards = [
  {
    title: 'Fleet tire requests',
    description: 'Share the vehicles, tire sizes, quantities, and timing you need. The shop will confirm available options directly.',
    icon: CircleDot,
  },
  {
    title: 'Planning for repeat needs',
    description: 'Tell us how your vehicles are used and what usually needs attention so we can discuss a practical service approach.',
    icon: ClipboardList,
  },
  {
    title: 'Hauling coordination',
    description: 'If your operation also accumulates waste tires, ask whether our separate tire hauling service fits your needs.',
    icon: Truck,
  },
];

const requestDetails = [
  'Business name and best contact person',
  'Number and types of vehicles',
  'Known tire sizes and quantities',
  'New or used tire preference, if any',
  'Timing and any recurring service needs',
];

export default function FleetPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-zinc-800 bg-zinc-950 py-16 text-white sm:py-20 lg:py-24">
        <div className="container grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-red-400">Fleet service</p>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Local tire support for your business vehicles
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Tell us what your fleet runs, what tire sizes you need, and what is coming up. Our El Cajon team will confirm how we can help based on your actual vehicles and current availability.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 bg-red-600 px-6 font-bold hover:bg-red-700">
                <Link href="/contact">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Discuss Your Fleet
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-zinc-600 bg-transparent px-6 font-bold text-white hover:bg-white hover:text-zinc-950">
                <a href={phoneHref}>
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call 619-440-6098
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl sm:p-8">
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-600 text-white">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-black">Start with the fleet basics</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">A few details help the shop give you a useful, accurate answer.</p>
            <ul className="mt-5 space-y-3">
              {requestDetails.map((detail) => (
                <li key={detail} className="flex gap-3 text-sm leading-6 text-zinc-200">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-14 sm:py-18" aria-labelledby="fleet-help-heading">
        <div className="container">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-red-600">How we can help</p>
            <h2 id="fleet-help-heading" className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Fleet support built around real needs
            </h2>
            <p className="mt-3 text-base leading-7 text-zinc-600">
              We do not assume every fleet needs the same program. Start with a direct conversation, then confirm the products and service path that fit.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {serviceCards.map((service) => {
              const Icon = service.icon;
              return (
                <Card key={service.title} className="border-zinc-200 bg-white shadow-sm">
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <CardTitle className="mt-3 text-xl font-black">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-zinc-600">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-18" aria-labelledby="fleet-process-heading">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-16">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.16em] text-red-600">Simple next step</p>
            <h2 id="fleet-process-heading" className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Talk to the people who will help you
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Fleet inquiries go through the local shop, so the details can be checked before any product, availability, or scheduling commitment is made.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 bg-red-600 font-bold hover:bg-red-700">
                <Link href="/contact">Send Fleet Details</Link>
              </Button>
              <Button asChild variant="outline" className="h-11 font-bold">
                <a href={whatsAppHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp the Shop
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            </div>
          </div>

          <ol className="grid gap-4">
            {[
              ['1', 'Share the fleet details', 'Send the vehicle types, tire sizes, quantities, timing, and the best way to reach you.'],
              ['2', 'Confirm the available path', 'The shop reviews the request and confirms which products or services can support it.'],
              ['3', 'Choose the next step', 'Once the details are clear, arrange the appropriate shop visit or follow-up directly with the team.'],
            ].map(([number, title, description]) => (
              <li key={number} className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">{number}</span>
                <div>
                  <h3 className="font-black text-zinc-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 py-12">
        <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-black text-zinc-950">Need waste-tire pickup too?</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Tire hauling is a separate service. Review the hauling information, then contact the shop to confirm service details for your operation.
            </p>
          </div>
          <Button asChild variant="outline" className="h-11 shrink-0 font-bold">
            <Link href="/hauling">
              <Route className="h-4 w-4" aria-hidden="true" />
              View Tire Hauling
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-red-700 py-14 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ready to discuss your fleet?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-red-100">
            Send the basics or call the El Cajon shop. We will keep the conversation grounded in your vehicles and confirmed availability.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-white px-6 font-bold text-red-700 hover:bg-zinc-100">
              <Link href="/contact">Contact the Shop</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-red-300 bg-transparent px-6 font-bold text-white hover:bg-white hover:text-red-700">
              <a href={phoneHref}>Call 619-440-6098</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
