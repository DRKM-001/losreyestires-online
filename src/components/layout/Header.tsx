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
    <header className="sticky top-0 z-50 w-full bg-black text-white">
      {/* Top bar */}
      <div className="border-b border-zinc-800 bg-zinc-900">
        <div className="container flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <a href="tel:+1234567890" className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline font-medium">CALL 877-474-4821</span>
            </a>
            <span className="hidden md:inline text-zinc-400">FREE SHIPPING ON ORDERS $150+</span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link href="/locations" className="hover:text-red-500 transition-colors uppercase text-[11px]">
              Find a Store
            </Link>
            <Link href="/schedule" className="hover:text-red-500 transition-colors uppercase text-[11px]">
              Schedule Install
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-tight">LOS REYES</span>
            <span className="text-2xl font-black text-red-600 ml-2">TIRES</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold uppercase transition-colors hover:text-red-500"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
              <Input
                type="search"
                placeholder="Search tires, wheels..."
                className="pl-8 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </div>
          </div>

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-zinc-800">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge 
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-red-600 hover:bg-red-700"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-zinc-800">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-semibold uppercase transition-colors hover:text-red-500"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-zinc-800">
                  <Link href="/locations" className="block py-2 hover:text-red-500 uppercase text-sm">
                    Find a Store
                  </Link>
                  <Link href="/schedule" className="block py-2 hover:text-red-500 uppercase text-sm">
                    Schedule Install
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
