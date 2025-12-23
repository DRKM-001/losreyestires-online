'use client';

import Link from 'next/link';
import { ShoppingCart, Search, Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

export function Header() {
  // TODO: Replace with actual cart state from context
  const cartItemCount = 0;

  const navigation = [
    { name: 'Tires', href: '/tires' },
    { name: 'Wheels', href: '/wheels' },
    { name: 'Packages', href: '/packages' },
    { name: 'Services', href: '/services' },
    { name: 'Deals', href: '/deals' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="border-b bg-zinc-50">
        <div className="container flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-red-600 transition-colors text-zinc-700">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">877-474-4821</span>
            </a>
            <span className="hidden md:inline text-zinc-600 font-medium">Free Shipping Sitewide!</span>
          </div>
          <div className="flex items-center gap-6 font-semibold text-zinc-700">
            <Link href="/locations" className="hover:text-red-600 transition-colors text-[11px]">
              Find an Installer
            </Link>
            <Link href="/support" className="hover:text-red-600 transition-colors text-[11px]">
              Support
            </Link>
            <Link href="/track" className="hover:text-red-600 transition-colors text-[11px]">
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-20 items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl lg:text-3xl font-black tracking-tight text-zinc-900">LOS REYES</span>
            <span className="text-2xl lg:text-3xl font-black text-red-600">TIRES</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold text-zinc-700 hover:text-red-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden xl:flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="search"
                placeholder="Search products, categories..."
                className="pl-10 h-10 bg-white border-zinc-300 focus:border-red-600 focus:ring-red-600"
              />
            </div>
          </div>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-zinc-100">
              <ShoppingCart className="h-6 w-6 text-zinc-700" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-600 hover:bg-red-700 border-2 border-white"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-zinc-100">
                <Menu className="h-6 w-6 text-zinc-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-bold text-zinc-700 hover:text-red-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Link href="/locations" className="block py-2 text-sm font-semibold text-zinc-600 hover:text-red-600">
                    Find an Installer
                  </Link>
                  <Link href="/support" className="block py-2 text-sm font-semibold text-zinc-600 hover:text-red-600">
                    Support
                  </Link>
                  <Link href="/track" className="block py-2 text-sm font-semibold text-zinc-600 hover:text-red-600">
                    Track Order
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
