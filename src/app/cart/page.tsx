'use client';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cart, cartShipping, cartSubtotal, useCart } from '@/modules/cart/store';
import { money } from '@/lib/store';

export default function CartPage() {
  const lines = useCart();
  const subtotal = cartSubtotal(lines);
  const shipping = cartShipping(lines);
  return (
    <main className="min-h-screen bg-sand-50">
      <section className="container-x py-10 sm:py-14">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-stone-850 sm:text-5xl">Your cart</h1>
        {lines.length === 0 ? (
          <div className="mt-8 rounded-xl border border-sand-200 bg-white p-8 shadow-card">
            <p className="text-stone-750">Nothing in it yet.</p>
            <Link href="/shop" className="mt-4 inline-flex items-center gap-2 rounded-md bg-blaze-500 px-5 py-3 font-bold uppercase tracking-wide text-white hover:bg-blaze-600">Shop wheels</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-sand-200 rounded-xl border border-sand-200 bg-white shadow-card">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 p-4 sm:p-5">
                  <Link href={`/shop/${l.id}`} className="h-24 w-24 flex-none overflow-hidden rounded-md border border-sand-200 bg-sand-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {l.image ? <img src={l.image} alt="" className="h-full w-full object-contain p-2" /> : null}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/shop/${l.id}`} className="font-display text-xl font-bold uppercase leading-tight text-stone-850 hover:text-blaze-600">{l.name}</Link>
                    <p className="text-sm text-stone-750">{l.spec}</p>
                    <p className="font-mono text-xs text-stone-750/60">{l.sku}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-md border border-sand-300">
                        <button type="button" aria-label="Fewer" onClick={() => cart.setQty(l.id, l.qty - 1)} className="h-9 w-9 text-stone-750 hover:text-blaze-600"><Minus className="mx-auto h-4 w-4" /></button>
                        <span className="w-8 text-center font-bold tabular-nums">{l.qty}</span>
                        <button type="button" aria-label="More" onClick={() => cart.setQty(l.id, l.qty + 1)} className="h-9 w-9 text-stone-750 hover:text-blaze-600"><Plus className="mx-auto h-4 w-4" /></button>
                      </div>
                      <span className="text-sm text-stone-750">{money(l.price_cents)} each</span>
                      <button type="button" onClick={() => cart.remove(l.id)} className="ml-auto inline-flex items-center gap-1 text-sm text-stone-750/70 hover:text-blaze-600"><Trash2 className="h-4 w-4" /> Remove</button>
                    </div>
                  </div>
                  <div className="hidden text-right font-display text-xl font-bold text-stone-850 sm:block">{money(l.price_cents * l.qty)}</div>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-xl border border-sand-200 bg-white p-5 shadow-card lg:sticky lg:top-24">
              <h2 className="font-display text-2xl font-bold uppercase text-stone-850">Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-stone-750">Subtotal</dt><dd className="font-semibold tabular-nums">{money(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-750">Shipping</dt><dd className="font-semibold tabular-nums">{shipping ? money(shipping) : 'Free'}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-750">Tax</dt><dd className="text-stone-750/70">at checkout</dd></div>
                <div className="flex justify-between border-t border-sand-200 pt-3 text-base"><dt className="font-bold">Total before tax</dt><dd className="font-display text-2xl font-bold tabular-nums">{money(subtotal + shipping)}</dd></div>
              </dl>
              <Link href="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-md bg-blaze-500 font-bold uppercase tracking-wide text-white shadow-blaze hover:bg-blaze-600">Checkout</Link>
              <p className="mt-3 text-xs text-stone-750/70">Secure payment by card, Apple Pay or Google Pay. Prices are confirmed at checkout.</p>
              <Link href="/shop" className="mt-3 block text-center text-sm font-semibold text-blaze-600">Keep shopping</Link>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
