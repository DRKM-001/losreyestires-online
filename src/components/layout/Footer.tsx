import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BrandWordmark } from '@/components/layout/BrandWordmark';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { Separator } from '@/components/ui/separator';

const footerGroups = [
  {
    title: 'Shop & Services',
    links: [
      { name: 'Shop Tires', href: '/tires' },
      { name: 'Wheels', href: '/wheels' },
      { name: 'Check Availability', href: '/#quote' },
      { name: 'Fleet Service', href: '/fleet' },
      { name: 'Tire Hauling', href: '/hauling' },
    ],
  },
  {
    title: 'Visit & Help',
    links: [
      { name: 'Contact the Shop', href: '/contact' },
      { name: 'El Cajon Location', href: '/locations' },
      { name: 'Financing Options', href: '/financing' },
      { name: 'Warranty Information', href: '/warranty' },
      { name: 'Frequently Asked Questions', href: '/faq' },
    ],
  },
  {
    title: 'Information',
    links: [
      { name: 'About Los Reyes', href: '/about' },
      { name: 'Tire & Wheel Encyclopedia', href: '/encyclopedia' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Messaging Terms', href: '/messaging-terms' },
    ],
  },
];

const contactLinkClass =
  'flex min-h-11 items-center gap-3 rounded-sm text-sm text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500';

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="container py-12 sm:py-14">
        <div className="grid gap-11 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-4 focus-visible:ring-offset-zinc-950"
              aria-label="Los Reyes Tires home"
            >
              <BrandWordmark inverse size="footer" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400">
              Family owned since 2005. Local tire and wheel help in El Cajon.
            </p>

            <address className="mt-5 space-y-0.5 not-italic">
              <a href="tel:619-440-6098" className={contactLinkClass}>
                <Phone className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                619-440-6098
              </a>
              <a
                href="https://wa.me/16197299468"
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClass}
              >
                <MessageCircle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                WhatsApp the shop
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href="mailto:sales@losreyestires.com" className={contactLinkClass}>
                <Mail className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                <span className="break-all">sales@losreyestires.com</span>
              </a>
              <div className="flex min-h-11 items-start gap-3 pt-2 text-sm leading-5 text-zinc-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
                <span>1245 N 1st St<br />El Cajon, CA 92021 · Open 7 days</span>
              </div>
            </address>
          </div>

          <nav className="grid gap-8 sm:grid-cols-3" aria-label="Footer navigation">
            {footerGroups.map((group) => (
              <section key={group.title} aria-labelledby={`footer-${group.title.toLowerCase().replaceAll(' ', '-')}`}>
                <h2
                  id={`footer-${group.title.toLowerCase().replaceAll(' ', '-')}`}
                  className="text-xs font-black uppercase tracking-[0.16em] text-zinc-100"
                >
                  {group.title}
                </h2>
                <ul className="mt-3 space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center rounded-sm py-1 text-sm leading-5 text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <Separator className="my-10 bg-zinc-800" />

        <div>
          <div className="flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-zinc-500">© {new Date().getFullYear()} Los Reyes Tires. All rights reserved.</p>
              <p className="text-xs text-zinc-600">
                Developed by{' '}
                <a
                  href="https://drkm.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  DRKM Systems
                  <span className="sr-only"> at DRKM.io (opens in a new tab)</span>
                </a>
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-1" aria-label="External profiles and feedback">
              <a
                href="https://g.page/r/CVxUx3jWbjPzEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-bold text-zinc-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <GoogleIcon className="h-4 w-4" />
                Review on Google
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="https://www.yelp.com/biz/los-reyes-tire-shop-el-cajon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <Image src="/yelp_logos/Burst/yelp_burst.svg" alt="" width={16} height={16} className="h-4 w-4" />
                Yelp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a
                href="https://wa.me/16197299468"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
