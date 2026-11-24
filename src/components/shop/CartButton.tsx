'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { cartCount, useCart } from '@/modules/cart/store';

export function CartButton({ className = '' }: { className?: string }) {
  const n = cartCount(useCart());
  return (
    <Link href="/cart" aria-label={n ? `Cart, ${n} items` : 'Cart'} className={`relative inline-flex h-10 w-10 items-center justify-center rounded-md text-stone-750 transition-colors hover:text-blaze-600 ${className}`}>
      <ShoppingCart className="h-5 w-5" aria-hidden="true" />
      {n ? <span className="absolute -right-0.5 -top-0.5 min-w-[18px] rounded-full bg-blaze-500 px-1 text-center text-[11px] font-bold leading-[18px] text-white">{n}</span> : null}
    </Link>
  );
}
