'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MapPin, Phone } from 'lucide-react';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { site, track } from '@/lib/site';

/** Phones: a 3-button bar fixed to the bottom. Desktop: a floating WhatsApp button after scrolling.
 *  Both carry the quote draft, and both step aside while the quote form itself is on screen. */
export function ContactDock() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [quoteInView, setQuoteInView] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 500);
    on();
    window.addEventListener('scroll', on, { passive: true });
    const q = document.getElementById('quote');
    let io: IntersectionObserver | undefined;
    if (q && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => setQuoteInView(e.isIntersecting), { threshold: 0.15 });
      io.observe(q);
    } else setQuoteInView(false);
    return () => { window.removeEventListener('scroll', on); io?.disconnect(); };
  }, [pathname]);

  if (pathname.startsWith('/fleet/request') || pathname.startsWith('/hauling/request')) return null;

  return (
    <>
      <nav aria-label="Quick contact" aria-hidden={quoteInView}
        className={`safe-bottom fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-sand-200 bg-sand-50/95 px-2 pt-2 backdrop-blur transition-transform duration-300 lg:hidden ${quoteInView ? 'pointer-events-none translate-y-full' : 'translate-y-0'}`}>
        <a href={site.phoneHref} onClick={() => track('call')} tabIndex={quoteInView ? -1 : 0} className="flex flex-col items-center gap-0.5 rounded-lg bg-blaze-500 py-2 text-[13px] font-bold uppercase tracking-wide text-white"><Phone className="h-5 w-5" />Call</a>
        <ShopWaLink label="short" className="flex min-w-0 flex-col items-center gap-0.5 rounded-lg bg-wa-500 px-1 py-2 text-[13px] font-bold uppercase tracking-wide text-ink-950">
          <WhatsAppIcon className="h-5 w-5" />
        </ShopWaLink>
        <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" onClick={() => track('directions')} tabIndex={quoteInView ? -1 : 0} className="flex flex-col items-center gap-0.5 rounded-lg bg-ink-900 py-2 text-[13px] font-bold uppercase tracking-wide text-sand-50"><MapPin className="h-5 w-5" />Directions</a>
      </nav>

      <ShopWaLink
        className={`group fixed bottom-6 right-6 z-[60] hidden items-center overflow-hidden rounded-full bg-wa-500 text-ink-950 shadow-lg shadow-black/25 transition-all duration-300 hover:bg-wa-600 lg:flex ${scrolled && !quoteInView ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
        <span className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <span className="pointer-events-none absolute inset-0 rounded-full bg-wa-500 opacity-60 motion-safe:animate-ping" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </span>
        <span className="max-w-0 whitespace-nowrap font-bold uppercase tracking-wide transition-all duration-300 group-hover:max-w-[12rem] group-hover:pr-5">WhatsApp us</span>
      </ShopWaLink>
    </>
  );
}
