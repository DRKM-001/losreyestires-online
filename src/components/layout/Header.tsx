'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, MapPin, Menu, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandWordmark } from '@/components/layout/BrandWordmark';
import { cn } from '@/lib/utils';
import { SNAP_FINANCE_APPLICATION_URL } from '@/lib/financing';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navigation = [
  { name: 'Tires', href: '/tires' },
  { name: 'Wheels', href: '/wheels' },
  { name: 'Tire Hauling', href: '/hauling' },
  { name: 'El Cajon Shop', href: '/locations' },
];

const phoneHref = 'tel:619-440-6098';
const whatsAppHref = 'https://wa.me/16197299468';

function subscribeToScroll(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getScrollSnapshot() {
  return window.scrollY > 16;
}

function getServerScrollSnapshot() {
  return false;
}

export function Header() {
  const pathname = usePathname();
  const hasScrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot
  );
  const isHome = pathname === '/';
  const isTransparent = isHome && !hasScrolled;

  return (
    <header
      className={cn(
        'top-0 z-50 w-full transition-colors duration-200 motion-reduce:transition-none',
        isHome ? 'fixed inset-x-0' : 'sticky',
        isTransparent ? 'bg-transparent shadow-none' : 'bg-white shadow-sm'
      )}
    >
      <div
        className={cn(
          'hidden border-b text-white transition-colors duration-200 motion-reduce:transition-none sm:block',
          isTransparent ? 'border-white/15 bg-transparent' : 'border-zinc-800 bg-zinc-950'
        )}
      >
        <div className="container flex h-9 items-center justify-between text-sm">
          <Link
            href="/locations"
            className={cn(
              'flex min-h-9 items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              isTransparent ? 'text-white hover:text-zinc-200 focus-visible:ring-white' : 'text-zinc-200 hover:text-white focus-visible:ring-red-400'
            )}
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            <span>El Cajon · Open 7 days</span>
          </Link>
          <div className="flex h-full items-center gap-5">
            <a
              href={phoneHref}
              className={cn(
                'flex min-h-9 items-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isTransparent ? 'text-white hover:text-zinc-200 focus-visible:ring-white' : 'hover:text-red-300 focus-visible:ring-red-400'
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Call 619-440-6098</span>
            </a>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex min-h-9 items-center gap-2 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isTransparent ? 'text-white hover:text-zinc-200 focus-visible:ring-white' : 'hover:text-red-300 focus-visible:ring-red-400'
              )}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className={cn(
        'container flex h-16 items-center justify-between gap-2 transition-colors duration-200 motion-reduce:transition-none sm:h-20 sm:gap-6',
        isTransparent ? 'text-white' : 'text-zinc-950'
      )}>
        <Link
          href="/"
          className={cn(
            'flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            isTransparent ? 'focus-visible:ring-white focus-visible:ring-offset-zinc-950' : 'focus-visible:ring-red-600'
          )}
          aria-label="Los Reyes Tires home"
        >
          <BrandWordmark inverse={isTransparent} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2',
                isTransparent
                  ? 'text-white hover:bg-white/10 hover:text-white focus-visible:ring-white'
                  : 'text-zinc-700 hover:bg-zinc-100 hover:text-red-600 focus-visible:ring-red-600'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className={cn(
              'hidden w-40 md:inline-flex',
              isTransparent && 'border-white/70 bg-transparent text-white hover:bg-white hover:text-zinc-950'
            )}
          >
            {isTransparent ? (
              <a href={phoneHref}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Now
              </a>
            ) : (
              <a href={SNAP_FINANCE_APPLICATION_URL} target="_blank" rel="noopener noreferrer">
                Apply for Financing
                <ExternalLink aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </Button>
          <Button asChild className="h-11 bg-red-600 px-3 font-bold hover:bg-red-700 sm:px-4">
            <Link href="/#quote">
              <span className="sm:hidden">Availability</span>
              <span className="hidden sm:inline">Check Availability</span>
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'size-11 lg:hidden',
                  isTransparent && 'text-white hover:bg-white/10 hover:text-white'
                )}
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white p-6">
              <SheetHeader className="p-0 pr-8 text-left">
                <SheetTitle>Los Reyes Tires</SheetTitle>
                <SheetDescription>Local tire and wheel help in El Cajon.</SheetDescription>
              </SheetHeader>
              <nav className="mt-6 flex flex-col" aria-label="Mobile navigation">
                {navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className="flex min-h-12 items-center border-b border-zinc-100 py-3 text-lg font-bold text-zinc-800 transition-colors hover:text-red-600"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-6 grid gap-3">
                <Button asChild className="h-11 bg-red-600 font-bold hover:bg-red-700">
                  <a href={phoneHref}>
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call 619-440-6098
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-11 font-bold">
                  <a href={whatsAppHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-11 font-bold">
                  <a href={SNAP_FINANCE_APPLICATION_URL} target="_blank" rel="noopener noreferrer">
                    Apply for Financing
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
                <SheetClose asChild>
                  <Button asChild variant="outline" className="h-11 font-bold">
                    <Link href="/#quote">Check Availability</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
