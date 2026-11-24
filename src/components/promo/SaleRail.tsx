'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { promo } from '@/lib/promo';
import { usePromo } from './usePromo';

/**
 * Wraps the /shop results. During the promo, wide screens (≥1600px) get a
 * skyscraper ad pinned in the empty margin on each side of the page column —
 * the grid keeps its full width — and narrower screens get one slim banner
 * above the grid. Outside the window it is just the children.
 */
export function SaleLayout({ children }: { children: ReactNode }) {
  const { phase, endsIn } = usePromo();
  if (phase === 'off' || phase === 'after') return <>{children}</>;
  const live = phase === 'live';
  const caption = live ? `On now · ${endsIn}` : `Starts ${promo.dates.split(' – ')[0]}`;
  // The page column is 72rem; each ad sits 1.5rem outside it, 180px wide.
  const side = 'fixed top-32 hidden w-[180px] min-[1600px]:block';
  const ad = (src: string, pos: string) => (
    <Link key={src} href={`${promo.href}#wheels`} className={`${side} ${pos}`} aria-label="Method Race Wheels Black Friday sale: all wheels 20% off, Nov 26–30">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="lazy" className="w-full rounded-lg shadow-card" />
      <p className="mt-2 text-center font-mono text-[11px] font-bold uppercase tracking-widest text-stone-750">{caption}</p>
    </Link>
  );
  return (
    <>
      {ad(promo.images.story[0], 'left-[calc(50%-36rem-1.5rem-180px)]')}
      {ad(promo.images.story[1], 'right-[calc(50%-36rem-1.5rem-180px)]')}
      <Link href={`${promo.href}#wheels`} className="mt-6 flex items-center gap-4 overflow-hidden rounded-xl bg-[#ff2a1f] p-3 text-stone-950 min-[1600px]:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={promo.images.feed[0]} alt="" className="h-16 w-14 shrink-0 rounded-md object-cover object-top" />
        <div className="min-w-0">
          <p className="font-display text-xl font-black uppercase leading-none">20% off all Method wheels</p>
          <p className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest">{caption} · {promo.dates}</p>
        </div>
      </Link>
      {children}
    </>
  );
}
