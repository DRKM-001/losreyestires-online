import { ArrowRight, CreditCard, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { SNAP_FINANCE_APPLICATION_URL } from '@/lib/financing';

export function SnapFinanceBanner() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-14 text-sand-50" aria-labelledby="financing-band-heading">
      <div className="absolute inset-0 bg-grain opacity-[0.07]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-stripes opacity-20 [mask-image:linear-gradient(to_left,black,transparent)] md:block" />
      <div className="container-x relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <span className="clip-slash flex h-12 w-12 shrink-0 items-center justify-center bg-blaze-500 text-white"><CreditCard className="h-6 w-6" aria-hidden="true" /></span>
          <div>
            <h2 id="financing-band-heading" className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">Tires now, pay over time</h2>
            <p className="mt-2 max-w-xl text-sand-200/85">Financing through Snap Finance or Acima, with no-credit-needed options. Apply online in minutes.</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <a href={SNAP_FINANCE_APPLICATION_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-blaze-500 px-6 py-3 font-bold uppercase tracking-wide text-white shadow-blaze hover:bg-blaze-600">
            Apply with Snap<ExternalLink className="h-4 w-4" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/financing" className="group inline-flex items-center gap-2 rounded-md border border-sand-200/25 px-6 py-3 font-semibold text-sand-50 hover:bg-sand-50/5">
            All financing options<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
