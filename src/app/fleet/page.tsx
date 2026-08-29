import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CircleDot, ClipboardList, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Fleet Tire Service in El Cajon',
  description: 'Talk with Los Reyes Tires about tire support for your local business vehicles or fleet. Share your vehicle types, tire sizes, and service needs for a direct availability conversation.',
  path: '/fleet',
  keywords: ['fleet tire service El Cajon', 'commercial fleet tires San Diego', 'business vehicle tires El Cajon'],
  images: [{ url: '/og/fleet-og.jpg', alt: 'Los Reyes Tires — fleet tire service for business vehicles in El Cajon, CA' }],
});

const phoneHref = 'tel:619-440-6098';

const services = [
  {
    title: 'Fleet tire requests',
    description: 'Share the vehicles, tire sizes, quantities, and timing you need. The shop confirms available options directly.',
    icon: CircleDot,
  },
  {
    title: 'Planning for repeat needs',
    description: 'Tell us how your vehicles are used and what usually needs attention, and we set a practical service rhythm.',
    icon: ClipboardList,
  },
  {
    title: 'Hauling coordination',
    description: 'If your operation accumulates waste tires, ask whether our separate tire hauling service fits your needs.',
    icon: Truck,
  },
];

const steps = [
  ['1', 'Send the fleet basics', 'Vehicle types, tire sizes, quantities, timing, and the best way to reach you.'],
  ['2', 'We confirm what fits', 'The shop reviews the request and replies with the products and services that can support it.'],
  ['3', 'Schedule the work', 'Arrange the shop visit or follow-up directly with the team once the details are clear.'],
];

export default function FleetPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative overflow-hidden border-b border-zinc-100">
        <Image
          src="/fleet_imgs/fleet02.png"
          alt=""
          fill
          priority
          className="hidden object-cover object-right lg:block"
        />
        <div className="container relative py-14 sm:py-16 lg:py-40">
          <div className="max-w-xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="bg-red-600 py-1 pl-3 pr-4 text-xs font-bold uppercase tracking-[0.14em] text-white [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)]">
                Fleet service
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">El Cajon, CA</span>
            </div>
            <h1 className="max-w-xl text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              Tire support for <span className="italic text-red-600">your business vehicles</span>
            </h1>
            <div className="mt-5 h-1 w-24 bg-red-600" aria-hidden="true" />
            <p className="mt-6 max-w-md text-lg font-medium leading-8 text-zinc-800">
              Vans, pickups, box trucks, and everything in between. Send the basics once — the shop replies with real availability and pricing.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="h-12 bg-red-600 px-6 font-bold hover:bg-red-700">
                <Link href="/fleet/request">
                  Request Fleet Service
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-zinc-500">Family owned since 2005 · Open 7 days · 1245 N 1st St</p>
          </div>

          <Image
            src="/fleet_imgs/fleet02.png"
            alt="White work trucks and vans of the kinds serviced by Los Reyes Tires"
            width={1916}
            height={821}
            priority
            className="mt-10 w-full lg:hidden"
          />
        </div>
      </section>

      <section className="bg-zinc-50 py-16 sm:py-20" aria-labelledby="fleet-help-heading">
        <div className="container">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">What we handle</p>
            <h2 id="fleet-help-heading" className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              Fleet support built around real needs
            </h2>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title}>
                  <div className="flex size-11 items-center justify-center bg-red-600 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-zinc-950">{service.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="fleet-process-heading">
        <div className="container">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">How it works</p>
            <h2 id="fleet-process-heading" className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              One request, a direct answer
            </h2>
          </div>

          <ol className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {steps.map(([number, title, description]) => (
              <li key={number}>
                <span className="flex size-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">{number}</span>
                <h3 className="mt-4 text-xl font-bold text-zinc-950">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-600">{description}</p>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-sm leading-6 text-zinc-500">
            Need waste-tire pickup too? Tire hauling is a separate service —{' '}
            <Link href="/hauling" className="font-semibold text-red-600 underline-offset-4 hover:underline">
              see how tire hauling works
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="container pb-4" aria-hidden="true">
        <Image
          src="/fleet_imgs/fleet_wide.png"
          alt=""
          width={1916}
          height={821}
          className="w-full"
        />
      </div>

      <section className="bg-zinc-950 py-16 text-white sm:py-20">
        <div className="container flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready when <span className="italic text-red-500">your fleet</span> is
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-zinc-400">
              Five quick fields, read by the people who will actually help you.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-red-600 px-6 font-bold hover:bg-red-700">
              <Link href="/fleet/request">
                Request Fleet Service
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 border-zinc-600 bg-transparent px-6 font-bold text-white hover:bg-white hover:text-zinc-950">
              <a href={phoneHref}>Call 619-440-6098</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
