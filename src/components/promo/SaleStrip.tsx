'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { promo } from '@/lib/promo';
import { usePromo } from './usePromo';

/** The thin red line under the header: a teaser before the sale, live with a countdown during it. */
export function SaleStrip() {
  const { phase, endsIn } = usePromo();
  if (phase === 'off' || phase === 'after') return null;
  const live = phase === 'live';
  return (
    <Link href={promo.href} className="group block bg-blaze-500 text-white" aria-label={`${promo.headline}, ${promo.dates}`}>
      <div className="container-x flex items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-[13px] font-bold uppercase tracking-wider sm:text-sm">
        <span className="rounded-sm bg-stone-850 px-1.5 py-0.5 text-[10px] tracking-widest text-sand-50">{live ? 'On now' : 'Black Friday'}</span>
        <span>{promo.headline}</span>
        <span className="hidden text-white/80 sm:inline">· {live ? endsIn : promo.dates}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </Link>
  );
}
