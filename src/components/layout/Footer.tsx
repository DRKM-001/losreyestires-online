'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Clock, Facebook, Instagram, Mail, MapPin, Phone, Star } from 'lucide-react';
import { Wordmark } from '@/components/brand/Wordmark';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { site, track } from '@/lib/site';

const columns = [
  {
    title: 'Shop',
    links: [
      { name: 'Tires', href: '/tires' },
      { name: 'Wheels', href: '/wheels' },
      { name: 'Get a Quote', href: '/#quote' },
      { name: 'Fleet Service', href: '/fleet' },
      { name: 'Tire Hauling', href: '/hauling' },
      { name: 'Financing', href: '/financing' },
    ],
  },
  {
    title: 'Help',
    links: [
      { name: 'Contact the Shop', href: '/contact' },
      { name: 'El Cajon Location', href: '/locations' },
      { name: 'Warranty', href: '/warranty' },
      { name: 'FAQ', href: '/faq' },
      { name: 'About Los Reyes', href: '/about' },
      { name: 'Tire & Wheel Encyclopedia', href: '/encyclopedia' },
    ],
  },
];

const legal = [
  { name: 'Privacy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Messaging Terms', href: '/messaging-terms' },
];

const link = 'text-blaze-100/80 transition-colors hover:text-white';

export function Footer() {
  const pathname = usePathname();
  const formal = pathname.startsWith('/fleet/request') || pathname.startsWith('/hauling/request');
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-blaze-700 to-blaze-900 pb-20 text-blaze-100 lg:pb-0">
      <div className="absolute inset-0 bg-grain opacity-[0.06]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.07)_0_14px,transparent_14px_30px)] [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
      <div className="absolute inset-x-0 top-0 h-1 bg-ink-900" />

      {!formal && (
        <div className="relative border-b border-white/15 bg-blaze-600/40">
          <div className="container-x flex flex-col items-start justify-between gap-5 py-10 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-sand-50 sm:text-4xl">Need tires today?</h2>
              <p className="mt-2 text-blaze-100/90">Send your size and a real person at the El Cajon shop gets back to you.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/#quote" className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-bold uppercase tracking-wide text-blaze-700 shadow-lg shadow-blaze-900/30 hover:bg-blaze-50">
                Get a Quote<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <ShopWaLink className="inline-flex items-center gap-2 rounded-md bg-wa-500 px-6 py-3 font-bold uppercase tracking-wide text-ink-950 hover:bg-wa-600">
                <WhatsAppIcon className="h-4 w-4" />WhatsApp Us
              </ShopWaLink>
            </div>
          </div>
        </div>
      )}

      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Wordmark dark banner />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-blaze-100/80">
            New and used tires, wheels, fleet service and tire hauling on N 1st St in El Cajon. Family owned and run since 2005.
          </p>
          <a href={site.reviewHref} target="_blank" rel="noopener noreferrer" onClick={() => track('reviews')}
            className="mt-6 inline-flex items-center gap-3 rounded-lg border border-white/20 bg-white/[0.08] px-4 py-2.5 hover:border-white/40">
            <span className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</span>
            <span className="text-xs font-semibold text-sand-50">Review us on Google</span>
          </a>
          <div className="mt-6 flex items-center gap-3">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-white hover:bg-white hover:text-blaze-700"><Instagram className="h-4 w-4" /></a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/25 text-white hover:bg-white hover:text-blaze-700"><Facebook className="h-4 w-4" /></a>
            <a href={site.yelp} target="_blank" rel="noopener noreferrer" className="flex h-9 items-center rounded-md border border-white/25 px-3 text-xs font-bold uppercase tracking-wide text-white hover:bg-white hover:text-blaze-700">Yelp</a>
          </div>
        </div>

        {columns.map((c) => (
          <div key={c.title}>
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map((l) => <li key={l.href}><Link href={l.href} className={link}>{l.name}</Link></li>)}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={site.mapsHref} target="_blank" rel="noopener noreferrer" onClick={() => track('directions')} className={`flex items-start gap-2.5 ${link}`}><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />{site.address}</a></li>
            <li><a href={site.phoneHref} onClick={() => track('call')} className={`flex items-center gap-2.5 ${link}`}><Phone className="h-4 w-4 shrink-0 text-white" />{site.phone}</a></li>
            <li><ShopWaLink className={`flex items-center gap-2.5 ${link}`}><WhatsAppIcon className="h-4 w-4 shrink-0 text-white" />WhatsApp {site.whatsappDisplay}</ShopWaLink></li>
            <li><a href={`mailto:${site.email}`} className={`flex items-center gap-2.5 ${link}`}><Mail className="h-4 w-4 shrink-0 text-white" />{site.email}</a></li>
            <li className="flex items-start gap-2.5 pt-1 text-blaze-100/80">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <span className="w-full space-y-0.5">{site.hoursShort.map((h) => <span key={h.d} className="flex justify-between gap-6"><span>{h.d}</span><span className="text-blaze-100/60">{h.t}</span></span>)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/15 bg-blaze-900/60">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-blaze-100/60 sm:flex-row">
          <p>© {year} {site.name}, El Cajon, CA. All rights reserved.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-4">
            {legal.map((l) => <Link key={l.href} href={l.href} className="hover:text-white">{l.name}</Link>)}
            <a href="https://drkm.io" target="_blank" rel="noopener noreferrer" className="hover:text-white">Developed by DRKM Systems</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
