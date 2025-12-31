'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, Menu, Phone, User, LogOut, Package, Settings, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LoginModal } from '@/components/auth/LoginModal';
import { RegisterModal } from '@/components/auth/RegisterModal';
import { ReviewTicker } from '@/components/reviews/ReviewTicker';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  
  // TODO: Replace with actual auth state from context
  const isLoggedIn = false;
  const userName = 'John Doe';
  
  // TODO: Replace with actual cart state from context
  const cartItemCount = 0;

  const navigation = [
    { name: 'Tires', href: '/tires' },
    { name: 'Wheels', href: '/wheels' },
    { name: 'Packages', href: '/packages' },
    { name: 'Services', href: '/services' },
    { name: 'Financing', href: '/financing' },
    { name: 'Deals', href: '/deals' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="border-b bg-zinc-50">
        <div className="container flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href="tel:619-440-6098" className="flex items-center gap-2 hover:text-red-600 transition-colors text-zinc-700">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">619-440-6098</span>
            </a>
            <a href="https://wa.me/16197299468" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-red-600 transition-colors text-zinc-700" title="WhatsApp">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">WhatsApp</span>
            </a>
            <span className="hidden lg:inline text-zinc-600 font-medium">El Cajon, CA | Open 7 Days a Week</span>
          </div>
          <ReviewTicker />
          <div className="flex items-center gap-6 font-semibold text-zinc-700">
            <Link href="/financing" className="hover:text-red-600 transition-colors text-[11px]">
              Financing
            </Link>
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
          <Image
            src="/losreyes_000.png"
            alt="Los Reyes Tires"
            width={220}
            height={70}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Tires Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-bold">Tires</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium leading-none">Shop by Type</h4>
                    <ul className="grid gap-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/tires"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">All Tires</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Browse our complete tire catalog
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium leading-none text-zinc-600">Passenger</h4>
                      <ul className="grid gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tires?type=all-season"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              All-Season
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tires?type=winter"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Winter
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tires?type=performance"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Performance
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium leading-none text-zinc-600">Truck & SUV</h4>
                      <ul className="grid gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tires?type=all-terrain"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              All-Terrain
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/tires?type=mud-terrain"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Mud-Terrain
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Wheels Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-bold">Wheels</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-medium leading-none">Shop Wheels</h4>
                    <ul className="grid gap-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/wheels"
                            className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium">All Wheels</div>
                            <p className="text-sm leading-snug text-muted-foreground mt-1">
                              Browse our complete wheel catalog
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="mb-2 text-sm font-medium leading-none text-zinc-600">By Finish</h4>
                      <ul className="grid gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/wheels?finish=matte-black"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Matte Black
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/wheels?finish=chrome"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Chrome
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/wheels?finish=machined"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Machined
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium leading-none text-zinc-600">By Vehicle</h4>
                      <ul className="grid gap-1">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/wheels?size=20x10"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Truck & SUV
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/packages"
                              className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              Packages
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Packages Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-bold">Packages</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[300px] p-4">
                  <ul className="grid gap-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/packages"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          All Packages
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/packages?type=tire-wheel"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          Tire & Wheel Combos
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/packages?category=truck"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          Truck Packages
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/packages?category=suv"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          SUV Packages
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Services Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-bold">Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[300px] p-4">
                  <ul className="grid gap-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          All Services
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/installation"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          Tire Installation
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/alignment"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          Wheel Alignment
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/balancing"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          Balancing
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/services/rotation"
                          className="block select-none rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          Tire Rotation
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Financing link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/financing" className={navigationMenuTriggerStyle() + " text-sm font-bold"}>
                  Financing
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Deals link */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/deals" className={navigationMenuTriggerStyle() + " text-sm font-bold"}>
                  Deals
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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

          {/* User Avatar */}
          {isLoggedIn ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-zinc-100 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-red-600 text-white font-bold">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-1">
                  <div className="px-3 py-2 border-b">
                    <p className="font-semibold text-sm">{userName}</p>
                  </div>
                  <Link href="/account" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-zinc-100 rounded-md">
                    <User className="h-4 w-4" />
                    My Account
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-zinc-100 rounded-md">
                    <Package className="h-4 w-4" />
                    My Orders
                  </Link>
                  <Link href="/account/settings" className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-zinc-100 rounded-md">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  <button className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-zinc-100 rounded-md w-full text-left text-red-600">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLoginOpen(true)}
              className="gap-2 font-semibold hover:bg-zinc-100"
            >
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Sign In</span>
            </Button>
          )}

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
                  <Link href="/financing" className="block py-2 text-sm font-semibold text-zinc-600 hover:text-red-600">
                    Financing
                  </Link>
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
      {/* Auth Modals */}
      <LoginModal 
        open={loginOpen} 
        onOpenChange={setLoginOpen}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
      <RegisterModal 
        open={registerOpen} 
        onOpenChange={setRegisterOpen}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </header>
  );
}
