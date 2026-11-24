'use client';

import Link from 'next/link';
import { promo } from '@/lib/promo';
import { usePromo } from './usePromo';

/** The /shop page's side rail (wide screens) and top banner (narrow): the story-format dealer ads. */
export function SaleRail() {
  const { phase, endsIn } = usePromo();
  if (phase === 'off' || phase === 'after') return null;
  const live = phase === 'live';
  const caption = live ? `On now · ${endsIn}` : `Starts ${promo.dates.split(' – ')[0]} · prices drop automatically`;
  return (
    <>
      {/* Narrow screens: one banner above the grid. */}
      <Link href={promo.href + '#wheels'} className="mt-6 flex items-center gap-4 overflow-hidden rounded-xl bg-[#ff2a1f] p-4 text-stone-950 xl:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={promo.images.feed[0]} alt="" className="h-24 w-20 rounded-md object-cover object-top" />
        <div className="min-w-0">
          <p className="font-display text-2xl font-black uppercase leading-none">20% off all Method wheels</p>
          <p className="mt-1 text-sm font-bold">{promo.sub}</p>
          <p className="mt-1 font-mono text-xs font-bold uppercase tracking-widest">{caption}</p>
        </div>
      </Link>
      {/* Wide screens: a sticky rail with the two story ads. */}
      <aside className="hidden xl:block" aria-label="Black Friday sale">
        <div className="sticky top-28 flex flex-col gap-4">
          {promo.images.story.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="Method Race Wheels: all wheels 20% off, Nov 26–30" loading="lazy" className="w-full rounded-xl shadow-card" />
          ))}
          <p className="text-center font-mono text-xs font-bold uppercase tracking-widest text-stone-750">{caption}</p>
        </div>
      </aside>
    </>
  );
}
