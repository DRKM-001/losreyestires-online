import Link from 'next/link';
import { ArrowRight, MapPin, MessageCircle, Phone, SlidersHorizontal, Wrench } from 'lucide-react';
import { PageHero, heroBtn } from '@/components/layout/PageHero';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductImage } from '@/components/shop/ProductImage';
import { generatePageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';
import { brandSlug, listBrands, listProducts } from '@/lib/store';

export const metadata = generatePageMetadata({
  title: 'Wheels in El Cajon — Fuel, Method, KMC, XD, Moto Metal & More',
  description: 'Shop thousands of truck, off-road and street wheels online or at our El Cajon shop. Fuel, Method, KMC, XD, Moto Metal, Black Rhino, American Racing and more — free shipping, or we mount and install.',
  path: '/wheels',
  keywords: ['wheels El Cajon', 'custom wheels San Diego', 'Fuel wheels El Cajon', 'Method wheels San Diego', 'truck wheels El Cajon', 'off-road wheels'],
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Brands we lead with — a mix, so no one brand looks like the only option.
const FEATURED = ['Fuel', 'Method Race Wheels', 'KMC', 'XD', 'Moto Metal', 'Black Rhino Hard Alloys', 'American Racing', 'Niche', 'Rotiform', 'American Force', 'TSW', 'US Mag'];
const DIAMETERS = [15, 16, 17, 18, 20, 22, 24, 26];
const WIDTHS = [8, 8.5, 9, 10, 12, 14];
const BOLTS = [['6x5.5', 'Silverado · Sierra 1500 · Tacoma'], ['6x135', 'Ford F-150'], ['5x5', 'Jeep Wrangler · Gladiator'], ['8x170', 'Ford Super Duty'], ['8x180', 'Silverado · Sierra HD'], ['8x6.5', 'Ram 2500 · 3500']];

export default async function WheelsPage() {
  const [brands, picks] = await Promise.all([listBrands(), listProducts({ kind: 'wheel', in_stock: true, limit: 8 })]);
  const featured = FEATURED.map((n) => brands?.find((b) => b.brand === n)).filter((b): b is NonNullable<typeof b> => !!b);
  const totalWheels = brands?.reduce((s, b) => s + b.wheel, 0) ?? 0;

  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip="Wheels" title={<>Wheels that <span className="display-italic text-blaze-500">fit right</span></>}
        lede={`${totalWheels ? `${totalWheels.toLocaleString()} wheels` : 'Thousands of wheels'} from the brands that matter — shipped free, or shipped to our El Cajon shop and mounted, balanced and installed.`}>
        <Link href="/shop/wheels" className={heroBtn.primary}>Shop all wheels<ArrowRight className="h-4 w-4" /></Link>
        <Link href="/#quote" className={heroBtn.ghost}><MessageCircle className="h-4 w-4 text-blaze-400" />Help me pick</Link>
      </PageHero>

      <section className="container-x grid gap-8 py-10 sm:py-14 lg:grid-cols-[260px_1fr]">
        <aside>
          <form action="/shop/wheels" className="flex flex-col gap-4 rounded-xl border border-sand-200 bg-white p-5 shadow-card lg:sticky lg:top-24">
            <p className="flex items-center gap-2 font-display text-xl font-bold uppercase text-stone-850"><SlidersHorizontal className="h-4 w-4" />Find wheels</p>
            {[
              { name: 'dia', label: 'Diameter', opts: DIAMETERS.map((d) => [String(d), `${d}"`]) },
              { name: 'bolt', label: 'Bolt pattern', opts: BOLTS.map(([bp, fits]) => [bp, `${bp} — ${fits}`]) },
              { name: 'width', label: 'Width', opts: WIDTHS.map((w) => [String(w), `${w}"`]) },
              { name: 'brand', label: 'Brand', opts: FEATURED.map((b) => [b, b.replace(/ Race Wheels| Hard Alloys/, '')]) },
            ].map((f) => (
              <label key={f.name} className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-750/70">{f.label}</span>
                <select name={f.name} defaultValue="" className="h-10 rounded-md border border-sand-300 bg-white px-2.5 text-sm text-stone-850 focus:border-blaze-500 focus:outline-none">
                  <option value="">Any</option>
                  {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-850">
              <input type="checkbox" name="stock" value="1" className="h-4 w-4 accent-[var(--color-blaze-500)]" />
              In stock only
            </label>
            <button type="submit" className="h-11 rounded-md bg-blaze-500 font-bold uppercase tracking-wide text-white hover:bg-blaze-600">Show wheels</button>
            <p className="text-xs text-stone-750/70">Not sure of your bolt pattern? Model years change — we&apos;ll check it for free.</p>
          </form>
        </aside>

        <div className="min-w-0">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-stone-850 sm:text-4xl">Shop by brand</h2>
            <Link href="/shop/brands" className="text-sm font-semibold text-blaze-600">All brands →</Link>
          </div>
          {featured.length ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
              {featured.map((b) => (
                <Link key={b.brand} href={`/shop/brands/${brandSlug(b.brand)}`} className="group overflow-hidden rounded-xl border border-sand-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-blaze-500/50">
                  <div className="aspect-square bg-sand-100">
                    <ProductImage src={b.image} alt="" kind="wheel" className="h-full w-full object-contain p-4 transition-transform group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-3">
                    <p className="font-display text-lg font-bold uppercase leading-tight text-stone-850 group-hover:text-blaze-600">{b.brand.replace(/ Race Wheels| Hard Alloys/, '')}</p>
                    <p className="text-xs text-stone-750/80">{b.wheel.toLocaleString()} wheels</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              {FEATURED.map((b) => <Link key={b} href={`/shop/wheels?brand=${encodeURIComponent(b)}`} className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 hover:border-blaze-500">{b.replace(/ Race Wheels| Hard Alloys/, '')}</Link>)}
            </div>
          )}

          {picks?.items.length ? (
            <div className="mt-12">
              <div className="flex items-end justify-between gap-4">
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-stone-850 sm:text-4xl">In stock now</h2>
                <Link href="/shop/wheels?stock=1" className="text-sm font-semibold text-blaze-600">See all in stock →</Link>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                {picks.items.map((p) => <ProductCard key={p.id} p={p} />)}
              </div>
            </div>
          ) : null}

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-card">
            <Wrench className="h-7 w-7 text-blaze-600" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-stone-850">Not sure what fits?</h2>
            <p className="mt-2 text-stone-750">Send the year, make, model, current tire size and how you use the truck. We&apos;ll narrow it to wheels that fit — offset, backspacing and all.</p>
            <Link href="/#quote" className="mt-4 inline-block font-semibold text-blaze-600">Send vehicle details →</Link>
          </div>
          <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-card">
            <MapPin className="h-7 w-7 text-blaze-600" aria-hidden="true" />
            <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-stone-850">See them in person</h2>
            <p className="mt-2 text-stone-750">Stop by the El Cajon shop or call before you drive over. We mount, balance and install everything we sell.</p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/locations" className="font-semibold text-blaze-600">Location and hours →</Link>
              <a href={site.phoneHref} className="inline-flex items-center gap-1 font-semibold text-blaze-600"><Phone className="h-4 w-4" />{site.phone}</a>
            </div>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
}
