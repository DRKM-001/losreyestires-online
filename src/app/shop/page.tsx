import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight, Search } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { ProductImage } from '@/components/shop/ProductImage';
import { generatePageMetadata } from '@/lib/metadata';
import { DEPARTMENTS, listDepartments } from '@/lib/store';

export const metadata = generatePageMetadata({
  title: 'Shop Wheels, Tires & Accessories — Free Shipping',
  description: 'Buy wheels, tires, lighting and accessories online from Los Reyes Tires in El Cajon. Free shipping to your door, or ship to the shop and we mount and balance.',
  path: '/shop',
  keywords: ['buy wheels online', 'buy tires online', 'Method Race Wheels', 'Fuel wheels', 'off-road wheels San Diego', 'El Cajon tires'],
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  // Old links (/shop?q=…, /shop?bolt=…) from before the departments.
  const sp = await searchParams;
  if (sp.bolt || sp.dia) redirect(`/shop/wheels?${new URLSearchParams(Object.entries(sp).filter((e): e is [string, string] => !!e[1]))}`);
  if (sp.q) redirect(`/shop/search?q=${encodeURIComponent(sp.q)}`);
  const deps = await listDepartments();

  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip="Free shipping" title={<>The <span className="display-italic text-blaze-500">Shop</span></>}
        lede="Wheels, tires, lighting and accessories — shipped free to your door, or to our El Cajon shop so we can mount, balance and install.">
        <form action="/shop/search" className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-750/50" aria-hidden="true" />
          <input name="q" placeholder="Search everything — 35x12.50R20, Fuel Rebel, lug nuts…" aria-label="Search the shop"
            className="h-13 w-full rounded-md border border-sand-300 bg-white py-3.5 pl-11 pr-28 text-stone-850 placeholder:text-stone-750/50 focus:border-blaze-500 focus:outline-none" />
          <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded bg-blaze-500 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-blaze-600">Search</button>
        </form>
      </PageHero>

      <section className="container-x py-10 sm:py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {DEPARTMENTS.map((d) => {
            const dep = deps?.[d.kind];
            return (
              <div key={d.slug} className="flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-card">
                <Link href={`/shop/${d.slug}`} className="group relative block aspect-[4/3] bg-sand-100">
                  <ProductImage src={dep?.image} alt="" kind={d.kind} large className="h-full w-full object-contain p-8 transition-transform group-hover:scale-[1.04]" />
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Link href={`/shop/${d.slug}`} className="group flex items-center justify-between gap-3">
                    <h2 className="font-display text-3xl font-bold uppercase leading-none tracking-tight text-stone-850 group-hover:text-blaze-600">{d.title}</h2>
                    <ArrowRight className="h-5 w-5 flex-none text-blaze-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-sm text-stone-750">{d.blurb}</p>
                  {dep ? <p className="text-xs font-bold uppercase tracking-widest text-stone-750/60">{dep.total.toLocaleString()} {d.many} · {dep.in_stock.toLocaleString()} in stock</p> : null}
                  {dep?.brands.length ? (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                      {dep.brands.slice(0, 10).map((b) => (
                        <Link key={b.v} href={`/shop/${d.slug}?brand=${encodeURIComponent(b.v)}`} className="rounded-full border border-sand-300 px-2.5 py-1 text-xs font-semibold text-stone-750 hover:border-blaze-500 hover:text-blaze-600">{b.v}</Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/shop/brands" className="rounded-xl border border-sand-200 bg-white p-5 shadow-card hover:border-blaze-500">
            <p className="text-xs font-bold uppercase tracking-widest text-blaze-600">Shop by brand</p>
            <p className="mt-1 font-display text-xl font-bold uppercase text-stone-850">Fuel · Method · KMC · Toyo…</p>
            <p className="mt-1 text-sm text-stone-750">Every brand we sell, wheels to lighting.</p>
          </Link>
          <Link href="/shop/accessories?type=Lighting" className="rounded-xl border border-sand-200 bg-white p-5 shadow-card hover:border-blaze-500">
            <p className="text-xs font-bold uppercase tracking-widest text-blaze-600">Lighting</p>
            <p className="mt-1 font-display text-xl font-bold uppercase text-stone-850">LED bars, pods & bulbs</p>
            <p className="mt-1 text-sm text-stone-750">Morimoto, GTR and more — plus lugs, locks and caps.</p>
          </Link>
        </div>

        <div className="mt-14 rounded-xl border border-sand-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-stone-850 sm:text-3xl">How ordering works</h2>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ['Pick your parts', 'Filter by size and bolt pattern. Not sure what fits? WhatsApp us the year, make and model.'],
              ['Pay online', 'Card, Apple Pay or Google Pay. Shipping is included in every price; tax is added at checkout.'],
              ['Delivered or installed', 'Ships to your door, or choose “Ship to the shop” and we mount, balance and install when it lands.'],
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
