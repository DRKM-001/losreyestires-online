import Link from 'next/link';
import { ArrowLeft, Clock, FileDown, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FleetInquiryForm } from '@/components/fleet/FleetInquiryForm';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'Fleet Account Application',
  description: 'Apply for a fleet service account with Los Reyes Tires in El Cajon. Share your business details, billing contact, and fleet needs — the shop reviews every application directly.',
  path: '/fleet/request',
  keywords: ['fleet account application El Cajon', 'commercial tire account San Diego', 'fleet tire service application El Cajon'],
});

const nextSteps = [
  'The shop reviews your application — no automated replies.',
  'We confirm your account details, availability, and pricing.',
  'You schedule service, and your fleet is set up for future visits.',
];

export default function FleetRequestPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="container max-w-5xl py-12 sm:py-16">
        <Link
          href="/fleet"
          className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-zinc-600 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Fleet service
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          Fleet account application
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
          Tell us about your business, who to reach, and what your fleet runs. The El Cajon shop reviews every application personally and follows up directly to finish setting up your account.
        </p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <FleetInquiryForm />
          </div>

          <aside className="grid gap-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-bold text-zinc-950">What happens next</h2>
              <ol className="mt-4 space-y-3">
                {nextSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-6 text-zinc-600">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-bold text-zinc-950">Prefer a paper form?</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Download the fillable PDF, complete it, and email it to sales@losreyestires.com — or bring it to the shop.
              </p>
              <Button asChild variant="outline" className="mt-4 h-11 w-full font-bold">
                <a href="/fleet-account-application.pdf" download>
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  Download PDF Application
                </a>
              </Button>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6">
              <h2 className="text-lg font-bold text-zinc-950">Prefer to talk?</h2>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href="tel:619-440-6098"
                  className="flex min-h-9 items-center gap-3 font-semibold text-zinc-700 transition-colors hover:text-red-600"
                >
                  <Phone className="h-4 w-4 text-red-600" aria-hidden="true" />
                  619-440-6098
                </a>
                <a
                  href="https://wa.me/16197299468"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-9 items-center gap-3 font-semibold text-zinc-700 transition-colors hover:text-red-600"
                >
                  <MessageCircle className="h-4 w-4 text-red-600" aria-hidden="true" />
                  WhatsApp the shop
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <p className="flex items-center gap-3 text-zinc-500">
                  <Clock className="h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
                  Mon–Sat 7AM–7PM · Sun 8AM–3PM
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
