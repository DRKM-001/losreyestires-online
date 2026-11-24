'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { promo } from '@/lib/promo';
import { usePromo } from './usePromo';

/** Homepage block: the dealer ad beside the pitch. Hidden outside the promo window. */
export function SaleFeature() {
  const { phase, endsIn } = usePromo();
  if (phase === 'off' || phase === 'after') return null;
  const live = phase === 'live';
  return (
    <section aria-label={promo.headline} className="bg-[#ff2a1f] text-stone-950">
      <div className="container-x grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <span className="inline-block bg-stone-950 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
            {live ? `On now · ${endsIn}` : `Starts ${promo.dates.split(' – ')[0]}`}
          </span>
          <h2 className="mt-5 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            All Method wheels<br />
            <span className="text-white">20% off</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg font-semibold leading-snug">
            Black Friday through Cyber Monday, 5 days only. Every Method Race Wheel in the catalog, shipped to your door — then bring them in and we mount and balance.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href={promo.href} className="inline-flex h-12 items-center gap-2 bg-stone-950 px-6 font-display text-lg font-bold uppercase tracking-wide text-white transition-colors hover:bg-stone-850">
              {live ? 'Shop the sale' : 'Browse the wheels'} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <span className="font-mono text-sm font-bold uppercase tracking-widest">{promo.dates}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:gap-5">
          {promo.images.feed.slice(0, 2).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" loading="lazy" className={`w-full rounded-lg shadow-2xl ${i === 1 ? 'translate-y-6' : ''}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
