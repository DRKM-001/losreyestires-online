'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, ChevronDown, MapPin, Menu, Phone, Truck, X } from 'lucide-react';
import { Wordmark } from '@/components/brand/Wordmark';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { site, track } from '@/lib/site';

const navigation = [
  { name: 'Tires', href: '/tires' },
  { name: 'Wheels', href: '/wheels' },
  { name: 'Visit the Shop', href: '/locations' },
  { name: 'Contact', href: '/contact' },
];

const services = [
  { name: 'Fleet Service', description: 'Tire support for business vehicles and fleets.', href: '/fleet', icon: Building2 },
  { name: 'Tire Hauling', description: 'Commercial waste-tire pickup and hauling.', href: '/hauling', icon: Truck },
];

const navLink = 'whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-stone-750 transition-colors hover:text-blaze-600';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const quoteHref = pathname === '/' ? '#quote' : '/#quote';

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Skip to content</a>

      {/* Thin ink bar: where and how to reach the shop */}
      <div className="hidden bg-ink-900 text-sand-200 sm:block">
        <div className="container-x flex h-9 items-center justify-between text-[13px]">
          <a href={site.mapsHref} target="_blank" rel="noopener noreferrer" onClick={() => track('directions')} className="inline-flex items-center gap-2 hover:text-sand-50">
            <MapPin className="h-3.5 w-3.5 text-blaze-400" aria-hidden="true" />{site.street}, El Cajon · Open 7 days
          </a>
          <div className="flex items-center gap-5 font-semibold">
            <a href={site.phoneHref} onClick={() => track('call')} className="inline-flex items-center gap-1.5 hover:text-sand-50">
              <Phone className="h-3.5 w-3.5 text-blaze-400" aria-hidden="true" />{site.phone}
            </a>
            <ShopWaLink className="inline-flex items-center gap-1.5 hover:text-sand-50">
              <WhatsAppIcon className="h-3.5 w-3.5 text-wa-500" />WhatsApp {site.whatsappDisplay}
            </ShopWaLink>
          </div>
        </div>
      </div>

      <div className="border-b border-sand-200/70 bg-sand-50/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-3">
          <Link href="/" aria-label={`${site.name} home`}><Wordmark /></Link>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex xl:gap-7">
            {navigation.slice(0, 2).map((l) => <Link key={l.href} href={l.href} className={navLink}>{l.name}</Link>)}
            <div className="group relative">
              <button type="button" aria-haspopup="true" className={`${navLink} inline-flex items-center gap-1`}>
                Services<ChevronDown className="h-3.5 w-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" aria-hidden="true" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="rounded-xl border border-sand-200 bg-white p-2 shadow-card">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} className="group/item flex gap-3 rounded-lg p-3 transition-colors hover:bg-sand-50">
                      <span className="clip-slash flex h-10 w-10 shrink-0 items-center justify-center bg-blaze-50 text-blaze-600 transition-colors group-hover/item:bg-blaze-500 group-hover/item:text-white">
                        <s.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-display text-base font-semibold uppercase tracking-wide text-stone-850">{s.name}</span>
                        <span className="block text-sm leading-5 text-stone-750/80">{s.description}</span>
                      </span>
                    </Link>
                  ))}
                  <Link href="/financing" className="mt-1 flex items-center justify-between rounded-lg border-t border-sand-200 px-3 pb-2 pt-3 text-sm font-semibold text-stone-750 hover:text-blaze-600">
                    Financing options<span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
            {navigation.slice(2).map((l) => <Link key={l.href} href={l.href} className={navLink}>{l.name}</Link>)}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={quoteHref} className="whitespace-nowrap rounded-md bg-blaze-500 px-3.5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-blaze-600 sm:px-4">
              Get a Quote
            </a>
            <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="p-1 text-stone-850 lg:hidden">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {open && (
          <nav aria-label="Mobile" className="border-t border-sand-200 bg-sand-50 lg:hidden">
            <div className="container-x flex flex-col py-3">
              {[...navigation.slice(0, 2), ...services, { name: 'Financing', href: '/financing' }, ...navigation.slice(2)].map((l) => (
                <Link key={l.href} href={l.href} className="border-b border-sand-200/70 py-3 font-display text-lg font-semibold uppercase tracking-wide text-stone-850">{l.name}</Link>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <a href={site.phoneHref} onClick={() => track('call')} className="inline-flex items-center justify-center gap-2 rounded-md bg-blaze-500 py-3 font-bold uppercase tracking-wide text-white">
                  <Phone className="h-4 w-4" />Call
                </a>
                <ShopWaLink className="inline-flex items-center justify-center gap-2 rounded-md bg-wa-500 py-3 font-bold uppercase tracking-wide text-ink-950">
                  <WhatsAppIcon className="h-4 w-4" />WhatsApp
                </ShopWaLink>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
