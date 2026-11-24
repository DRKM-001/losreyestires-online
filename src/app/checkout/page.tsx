'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { cart, cartShipping, cartSubtotal, useCart } from '@/modules/cart/store';
import { money } from '@/lib/store';
import { site, track } from '@/lib/site';

// Checkout hands the cart to RavnPro, which prices it from the catalog and
// opens Stripe Checkout (card, Apple Pay, Google Pay; tax and address there).
export default function CheckoutPage() {
  const lines = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subtotal = cartSubtotal(lines);
  const shipping = cartShipping(lines);

  async function pay() {
    setBusy(true);
    setError(null);
    track('begin_checkout', { items: String(lines.length) });
    try {
      const origin = window.location.origin;
      const r = await fetch(`${site.storeApi}/checkout`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ lines: lines.map((l) => ({ id: l.id, qty: l.qty })), success_url: `${origin}/checkout/success`, cancel_url: `${origin}/cart`, page: '/checkout' }),
      });
      const j = (await r.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!r.ok || !j.url) throw new Error(j.error || 'Checkout is unavailable right now.');
      window.location.href = j.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-sand-50">
      <section className="container-x py-10 sm:py-14">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-stone-850 sm:text-5xl">Checkout</h1>
        {lines.length === 0 ? (
          <div className="mt-8 rounded-xl border border-sand-200 bg-white p-8 shadow-card">
            <p className="text-stone-750">Your cart is empty.</p>
            <Link href="/shop" className="mt-4 inline-flex rounded-md bg-blaze-500 px-5 py-3 font-bold uppercase tracking-wide text-white hover:bg-blaze-600">Shop wheels</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="rounded-xl border border-sand-200 bg-white p-5 shadow-card sm:p-6">
              <h2 className="font-display text-2xl font-bold uppercase text-stone-850">Your order</h2>
              <ul className="mt-4 divide-y divide-sand-200">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-4 py-3">
                    <div className="h-16 w-16 flex-none overflow-hidden rounded-md border border-sand-200 bg-sand-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {l.image ? <img src={l.image} alt="" className="h-full w-full object-contain p-1" /> : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-stone-850">{l.qty} × {l.name}</p>
                      <p className="text-sm text-stone-750">{l.spec}</p>
                    </div>
                    <p className="font-display text-lg font-bold tabular-nums">{money(l.price_cents * l.qty)}</p>
                  </li>
                ))}
              </ul>
              <Link href="/cart" className="mt-3 inline-block text-sm font-semibold text-blaze-600">Change quantities</Link>

              <div className="mt-8 rounded-lg bg-sand-100 p-4 text-sm text-stone-750">
                <p className="font-bold text-stone-850">What happens next</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  <li>Stripe&apos;s secure page takes your shipping address and card (Apple Pay / Google Pay work too). Tax is added there.</li>
                  <li>We place the order with the Method warehouse the same business day.</li>
                  <li>Tracking lands in your email; delivery is usually 1–3 business days to Southern California.</li>
                  <li>Want them mounted and balanced? Bring them by the shop when they arrive.</li>
                </ol>
              </div>
            </div>

            <aside className="h-fit rounded-xl border border-sand-200 bg-white p-5 shadow-card lg:sticky lg:top-24">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-stone-750">Subtotal</dt><dd className="font-semibold tabular-nums">{money(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-750">Shipping</dt><dd className="font-semibold tabular-nums">{shipping ? money(shipping) : 'Free'}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-750">Sales tax</dt><dd className="text-stone-750/70">calculated by Stripe</dd></div>
                <div className="flex justify-between border-t border-sand-200 pt-3 text-base"><dt className="font-bold">Due before tax</dt><dd className="font-display text-2xl font-bold tabular-nums">{money(subtotal + shipping)}</dd></div>
              </dl>
              <button type="button" onClick={() => void pay()} disabled={busy}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-blaze-500 font-bold uppercase tracking-wide text-white shadow-blaze transition-colors hover:bg-blaze-600 disabled:opacity-60">
                <Lock className="h-4 w-4" aria-hidden="true" />{busy ? 'Opening secure checkout…' : 'Pay securely'}
              </button>
              {error ? <p className="mt-3 rounded-md bg-blaze-50 p-3 text-sm font-semibold text-blaze-700">{error}</p> : null}
              <p className="mt-3 text-xs text-stone-750/70">Payments are processed by Stripe. Your card details never touch our site. Questions? Call {site.phone}.</p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
