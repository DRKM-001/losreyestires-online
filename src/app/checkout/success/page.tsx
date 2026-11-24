'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { cart } from '@/modules/cart/store';
import { money } from '@/lib/store';
import { site } from '@/lib/site';

type PublicOrder = {
  number: number;
  status: string;
  name: string | null;
  email: string | null;
  lines: { name: string; spec: Record<string, unknown>; qty: number; unit_cents: number }[];
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  total_cents: number;
  ship_to: Record<string, string> | null;
  deliver?: 'address' | 'shop';
};

// Back from Stripe. The webhook usually lands before the customer does; if
// not, we wait a few seconds and ask again.
export default function SuccessPage() {
  const [order, setOrder] = useState<PublicOrder | null>(null);
  const [tries, setTries] = useState(0);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const o = new URL(window.location.href).searchParams.get('order');
    setId(o);
    cart.clear();
  }, []);

  useEffect(() => {
    if (!id || order || tries > 8) return;
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`${site.storeApi}/orders/${id}`, { cache: 'no-store' });
        if (r.ok) setOrder((await r.json()) as PublicOrder);
        else setTries((n) => n + 1);
      } catch {
        setTries((n) => n + 1);
      }
    }, tries === 0 ? 300 : 1500);
    return () => clearTimeout(t);
  }, [id, order, tries]);

  return (
    <main className="min-h-screen bg-sand-50">
      <section className="container-x py-12 sm:py-16">
        <div className="mx-auto max-w-2xl rounded-xl border border-sand-200 bg-white p-6 shadow-card sm:p-10">
          <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
          <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-stone-850">
            {order ? <>Order #{order.number} is in</> : tries > 8 ? 'Payment received' : 'Confirming your payment…'}
          </h1>
          <p className="mt-3 text-stone-750">
            {order
              ? <>Thanks{order.name ? `, ${order.name.split(' ')[0]}` : ''}. A confirmation is on its way to {order.email ?? 'your email'}. We place the order with the warehouse today and email you tracking as soon as it ships.</>
              : tries > 8
                ? <>Your payment went through. The confirmation email will follow in a few minutes; if it doesn&apos;t, call us at {site.phone}.</>
                : 'One moment.'}
          </p>
          {order ? (
            <>
              <ul className="mt-6 divide-y divide-sand-200 border-y border-sand-200">
                {order.lines.map((l, i) => (
                  <li key={i} className="flex justify-between gap-4 py-3 text-sm">
                    <span><span className="font-bold text-stone-850">{l.qty} × {l.name}</span><span className="block text-stone-750">{[l.spec.size, l.spec.bolt_pattern, l.spec.finish].filter(Boolean).join(' · ')}</span></span>
                    <span className="font-semibold tabular-nums">{money(l.qty * l.unit_cents)}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between"><dt className="text-stone-750">Shipping</dt><dd>{order.shipping_cents ? money(order.shipping_cents) : 'Free'}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-750">Tax</dt><dd>{money(order.tax_cents)}</dd></div>
                <div className="flex justify-between text-base font-bold"><dt>Paid</dt><dd className="font-display text-xl">{money(order.total_cents)}</dd></div>
              </dl>
              {order.deliver === 'shop' ? <p className="mt-4 text-sm text-stone-750">Shipping to our shop in El Cajon — we&apos;ll call you when it lands to book the mounting and balancing.</p> : order.ship_to ? <p className="mt-4 text-sm text-stone-750">Ships to {[order.ship_to.line1, order.ship_to.city, order.ship_to.state, order.ship_to.postal_code].filter(Boolean).join(', ')}.</p> : null}
            </>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="inline-flex rounded-md bg-blaze-500 px-5 py-3 font-bold uppercase tracking-wide text-white hover:bg-blaze-600">Keep shopping</Link>
            <Link href="/locations" className="inline-flex rounded-md border border-sand-300 px-5 py-3 font-semibold text-stone-850 hover:border-blaze-500">Plan the install visit</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
