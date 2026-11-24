import Link from 'next/link';
import { Search } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ProductCard } from '@/components/shop/ProductCard';
import { generatePageMetadata } from '@/lib/metadata';
import { listProducts } from '@/lib/store';

export const metadata = generatePageMetadata({
  title: 'Shop Method Race Wheels — Ships to Your Door',
  description: 'Method Race Wheels at MAP pricing, shipped from the warehouse to your door. Filter by bolt pattern and size. Los Reyes Tires, El Cajon.',
  path: '/shop',
  keywords: ['Method Race Wheels', 'buy wheels online', 'Method 305 NV', 'Method 703', 'off-road wheels San Diego'],
});

// Cloudflare Pages: server-rendered pages run on the edge; no ISR there, so each view fetches fresh stock.
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const PAGE = 48;

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const q = (sp.q ?? '').trim();
  const bolt = (sp.bolt ?? '').trim();
  const dia = (sp.dia ?? '').trim();
  const stock = sp.stock !== '0';
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const data = await listProducts({ q, kind: 'wheel', bolt_pattern: bolt, diameter: dia, in_stock: stock, limit: PAGE, offset: (page - 1) * PAGE });
  const link = (patch: Record<string, string>) => {
    const p = new URLSearchParams({ ...(q ? { q } : {}), ...(bolt ? { bolt } : {}), ...(dia ? { dia } : {}), ...(stock ? {} : { stock: '0' }), ...patch });
    for (const [k, v] of Object.entries(patch)) if (!v) p.delete(k);
    const s = p.toString();
    return `/shop${s ? `?${s}` : ''}`;
  };
  const chip = (href: string, active: boolean, label: string) => (
    <Link key={href + label} href={href} aria-current={active ? 'page' : undefined}
      className={active ? 'rounded-full bg-stone-850 px-3.5 py-1.5 text-sm font-semibold text-sand-50' : 'rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 transition-colors hover:border-blaze-500'}>
      {label}
    </Link>
  );
  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE)) : 1;

  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip="Ships to your door" title={<>Method <span className="display-italic text-blaze-500">Race Wheels</span></>}
        lede="Every Method wheel at MAP pricing, shipped straight from the warehouse. Want them mounted? Bring them in when they land — we install what we sell." />

      <section className="container-x py-8 sm:py-10">
        <div className="flex flex-col gap-4">
          <form action="/shop" className="relative max-w-md">
            {bolt ? <input type="hidden" name="bolt" value={bolt} /> : null}
            {dia ? <input type="hidden" name="dia" value={dia} /> : null}
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-750/50" aria-hidden="true" />
            <input name="q" defaultValue={q} placeholder="Model, part number… (MR305, 703, Bead Grip)" aria-label="Search wheels"
              className="h-11 w-full rounded-md border border-sand-300 bg-white pl-9 pr-3 text-stone-850 placeholder:text-stone-750/50 focus:border-blaze-500 focus:outline-none" />
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-bold uppercase tracking-widest text-stone-750/70">Bolt pattern</span>
            {chip(link({ bolt: '', page: '' }), !bolt, 'Any')}
            {(data?.facets.bolt_patterns ?? []).map((b) => chip(link({ bolt: b, page: '' }), bolt === b, b))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-bold uppercase tracking-widest text-stone-750/70">Diameter</span>
            {chip(link({ dia: '', page: '' }), !dia, 'Any')}
            {(data?.facets.diameters ?? []).map((d) => chip(link({ dia: String(d), page: '' }), dia === String(d), `${d}"`))}
            <span className="ml-auto flex items-center gap-2">
              {chip(link({ stock: stock ? '0' : '', page: '' }), stock, stock ? 'In stock only ✓' : 'In stock only')}
            </span>
          </div>
          <p className="text-sm text-stone-750/80">
            {data ? `${data.total.toLocaleString()} ${data.total === 1 ? 'wheel' : 'wheels'}${q ? ` for “${q}”` : ''}` : 'The catalog is taking a moment — try again shortly.'}
            {q || bolt || dia ? <> · <Link href="/shop" className="font-semibold text-blaze-600">Clear</Link></> : null}
          </p>
        </div>

        {data?.items.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.items.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-sand-200 bg-white p-8 text-center shadow-card">
            <p className="font-display text-2xl font-bold uppercase text-stone-850">Nothing in stock matches</p>
            <p className="mt-2 text-stone-750">Try another bolt pattern or turn off “In stock only” — anything backordered can still be reserved.</p>
          </div>
        )}

        {pages > 1 ? (
          <nav aria-label="Pages" className="mt-10 flex items-center justify-center gap-2">
            {page > 1 ? chip(link({ page: String(page - 1) }), false, '← Previous') : null}
            <span className="px-2 text-sm text-stone-750">Page {page} of {pages}</span>
            {page < pages ? chip(link({ page: String(page + 1) }), false, 'Next →') : null}
          </nav>
        ) : null}

        <div className="mt-14 rounded-xl border border-sand-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-stone-850 sm:text-3xl">How ordering works</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ['Pick your wheels', 'Filter by your bolt pattern. Not sure what you need? WhatsApp us the year, make and model.'],
              ['Pay online', 'Card, Apple Pay or Google Pay. Tax is calculated at checkout; shipping is shown before you pay.'],
              ['Delivered, then installed', 'Shipped from the Method warehouse to your door in 1–3 business days. Bring them in and we mount and balance.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3">
                <span className="font-display text-3xl font-bold text-blaze-500">{i + 1}</span>
                <div>
                  <h3 className="font-bold text-stone-850">{t}</h3>
                  <p className="mt-1 text-sm text-stone-750">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
