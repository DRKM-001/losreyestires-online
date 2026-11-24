import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronLeft, Truck } from 'lucide-react';
import { AddToCart } from '@/components/shop/AddToCart';
import { Gallery } from '@/components/shop/Gallery';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { availabilityLine, getProduct, money, specLine, titleCase } from '@/lib/store';
import { site } from '@/lib/site';

export const revalidate = 120;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = await getProduct((await params).id);
  if (!p) return { title: 'Not found' };
  return {
    title: `${p.model ?? p.name} ${p.spec.size ?? ''} ${p.spec.bolt_pattern ?? ''} — ${money(p.price_cents)} | ${site.name}`,
    description: `${p.name}. ${p.features[0] ?? ''} Ships to your door from ${site.name}, El Cajon.`,
    openGraph: p.images[0] ? { images: [p.images[0]] } : undefined,
  };
}

const specRows: [string, string][] = [
  ['size', 'Size'], ['bolt_pattern', 'Bolt pattern'], ['offset_mm', 'Offset'], ['backspacing_in', 'Backspacing'], ['hub_bore_mm', 'Hub bore'],
  ['finish', 'Finish'], ['max_load_lbs', 'Max load'], ['weight_lbs', 'Weight'], ['cap_type', 'Center cap'], ['hub_centric', 'Hub centric'], ['lip_in', 'Lip'],
];
const fmt = (k: string, v: string | number) => {
  if (k === 'offset_mm') return `${Number(v) > 0 ? '+' : ''}${v} mm`;
  if (k === 'backspacing_in' || k === 'lip_in') return `${v}"`;
  if (k === 'hub_bore_mm') return `${v} mm`;
  if (k === 'max_load_lbs') return `${Number(v).toLocaleString()} lbs`;
  if (k === 'weight_lbs') return `${v} lbs`;
  if (k === 'finish') return titleCase(String(v));
  if (k === 'hub_centric') return String(v).toUpperCase() === 'YES' ? 'Yes' : 'No (lug centric)';
  return String(v);
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await getProduct((await params).id);
  if (!p) notFound();
  const avail = availabilityLine(p, 1);
  const sale = p.msrp_cents && p.msrp_cents > p.price_cents;
  const finishes = Array.from(new Set([p.spec.finish, ...p.siblings.map((s) => s.finish)].filter(Boolean).map(String)));
  const sizesForFinish = (finish: string) => p.siblings.filter((s) => s.finish === finish);
  const defaultQty = p.kind === 'wheel' ? 4 : 1;

  return (
    <main className="min-h-screen bg-sand-50">
      <div className="container-x pt-5">
        <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-stone-750 hover:text-blaze-600"><ChevronLeft className="h-4 w-4" /> All wheels</Link>
      </div>
      <section className="container-x grid gap-8 py-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:py-10">
        <Gallery images={p.images} alt={p.name} />
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-stone-750/60">{p.brand}{p.series ? ` · ${p.series.replace(/\s*\(.*\)$/, '')}` : ''}</p>
          <h1 className="mt-1 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-stone-850 sm:text-5xl">{p.model ?? p.name}</h1>
          <p className="mt-2 text-lg text-stone-750">{specLine(p)}</p>
          <p className="mt-1 font-mono text-xs text-stone-750/60">Part # {p.sku}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-stone-850">{money(p.price_cents)}</span>
            <span className="text-sm text-stone-750/70">each</span>
            {sale ? <span className="text-stone-750/60 line-through">{money(p.msrp_cents!)}</span> : null}
            {p.status === 'closeout' ? <span className="clip-slash bg-blaze-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">Closeout</span> : null}
          </div>
          <p className={`mt-2 flex items-center gap-2 text-sm font-semibold ${avail.ok ? 'text-green-700' : 'text-stone-750'}`}>
            <Truck className="h-4 w-4" aria-hidden="true" />{avail.text}
          </p>
          <p className="mt-1 text-sm text-stone-750/80">{p.ship_flat_cents ? `${money(p.ship_flat_cents)} shipping per order` : 'Free shipping'} · tax calculated at checkout · mounting at the shop extra</p>

          <div className="mt-6">
            <AddToCart line={{ id: p.id, sku: p.sku, name: p.model ?? p.name, spec: specLine(p), image: p.images[0] ?? null, price_cents: p.price_cents, ship_flat_cents: p.ship_flat_cents }} available={p.available} defaultQty={defaultQty} />
          </div>

          {p.siblings.length ? (
            <div className="mt-8 space-y-4">
              {finishes.map((finish) => {
                const opts = sizesForFinish(finish);
                const mine = finish === p.spec.finish;
                if (!opts.length && !mine) return null;
                return (
                  <div key={finish}>
                    <p className="text-xs font-bold uppercase tracking-widest text-stone-750/70">{titleCase(finish)}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {mine ? <span className="rounded-md border-2 border-blaze-500 bg-white px-3 py-1.5 text-sm font-semibold text-stone-850">{p.spec.size} · {p.spec.bolt_pattern} · {fmt('offset_mm', p.spec.offset_mm ?? 0)}</span> : null}
                      {opts.map((s) => (
                        <Link key={s.id} href={`/shop/${s.id}`} className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition-colors hover:border-blaze-500 ${s.available > 0 ? 'border-sand-300 bg-white text-stone-850' : 'border-sand-200 bg-sand-100 text-stone-750/60'}`} title={s.available > 0 ? `${s.available} in stock` : 'Backorder'}>
                          {s.size} · {s.bolt_pattern} · {s.offset_mm && Number(s.offset_mm) > 0 ? '+' : ''}{s.offset_mm ?? 0} mm
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="mt-8 rounded-xl border border-sand-200 bg-white p-5 shadow-card">
            <p className="font-bold text-stone-850">Not sure it fits?</p>
            <p className="mt-1 text-sm text-stone-750">Send us the year, make and model and we&apos;ll confirm bolt pattern, offset and tire size before you order.</p>
            <ShopWaLink className="mt-3 inline-flex items-center gap-2 rounded-md bg-wa-500 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-ink-950 hover:bg-wa-600"><WhatsAppIcon className="h-4 w-4" />Ask on WhatsApp</ShopWaLink>
          </div>
        </div>
      </section>

      <section className="container-x grid gap-8 pb-16 lg:grid-cols-2">
        <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-card">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-stone-850">Specs</h2>
          <dl className="mt-4 divide-y divide-sand-200">
            {specRows.filter(([k]) => p.spec[k] !== undefined && p.spec[k] !== null && p.spec[k] !== '').map(([k, label]) => (
              <div key={k} className="flex justify-between gap-4 py-2 text-sm">
                <dt className="text-stone-750/80">{label}</dt>
                <dd className="font-semibold text-stone-850">{fmt(k, p.spec[k])}</dd>
              </div>
            ))}
            {p.upc ? <div className="flex justify-between gap-4 py-2 text-sm"><dt className="text-stone-750/80">UPC</dt><dd className="font-mono text-stone-850">{p.upc}</dd></div> : null}
          </dl>
        </div>
        {p.features.length ? (
          <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-card">
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-stone-850">Features</h2>
            <ul className="mt-4 space-y-2">
              {p.features.map((f) => <li key={f} className="flex gap-3 text-sm text-stone-750"><span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-blaze-500" />{f}</li>)}
            </ul>
            <p className="mt-5 text-xs text-stone-750/60">Sold and supported by {site.name}, an authorized {p.vendor} dealer. Ships from the {p.vendor} warehouse.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}
