'use client';
import { useState } from 'react';
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { cart } from '@/modules/cart/store';
import { track } from '@/lib/site';

export function AddToCart({ line, available, defaultQty }: { line: { id: string; sku: string; name: string; spec: string; image: string | null; price_cents: number; ship_flat_cents: number }; available: number; defaultQty: number }) {
  const [qty, setQty] = useState(defaultQty);
  const [added, setAdded] = useState(false);
  const can = available > 0;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center rounded-md border border-sand-300 bg-white">
          <button type="button" aria-label="Fewer" onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-11 w-11 text-stone-750 hover:text-blaze-600"><Minus className="mx-auto h-4 w-4" /></button>
          <span className="w-10 text-center font-display text-xl font-bold tabular-nums">{qty}</span>
          <button type="button" aria-label="More" onClick={() => setQty((q) => Math.min(16, q + 1))} className="h-11 w-11 text-stone-750 hover:text-blaze-600"><Plus className="mx-auto h-4 w-4" /></button>
        </div>
        <button
          type="button"
          disabled={!can}
          onClick={() => {
            cart.add(line, qty);
            setAdded(true);
            track('add_to_cart', { sku: line.sku, qty: String(qty) });
            setTimeout(() => setAdded(false), 2500);
          }}
          className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-blaze-500 px-6 font-bold uppercase tracking-wide text-white shadow-blaze transition-colors hover:bg-blaze-600 disabled:cursor-not-allowed disabled:bg-sand-300 disabled:text-stone-750/60 disabled:shadow-none"
        >
          {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> {can ? 'Add to cart' : 'Out of stock'}</>}
        </button>
      </div>
      {added ? (
        <p className="text-sm text-stone-750">
          In your cart. <Link href="/cart" className="font-semibold text-blaze-600 underline-offset-2 hover:underline">View cart</Link>
        </p>
      ) : null}
      {qty > available && available > 0 ? <p className="text-sm text-stone-750">Only {available} in stock right now; the rest ships when it lands.</p> : null}
    </div>
  );
}
