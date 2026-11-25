import Link from 'next/link';
import { PageHero } from '@/components/layout/PageHero';
import { ProductImage } from '@/components/shop/ProductImage';
import { generatePageMetadata } from '@/lib/metadata';
import { brandGroup, brandSlug, HIDDEN_BRANDS, listBrands, type BrandRow } from '@/lib/store';

export const metadata = generatePageMetadata({
  title: 'Shop by Brand — Fuel, Method, KMC, XD, Toyo & More',
  description: 'Every wheel, tire and accessory brand we sell online: Fuel, Method, KMC, XD, Moto Metal, Black Rhino, Toyo, Nitto, Falken and more. Free shipping from Los Reyes Tires, El Cajon.',
  path: '/shop/brands',
  keywords: ['Fuel wheels El Cajon', 'Method wheels San Diego', 'KMC wheels', 'Toyo tires El Cajon', 'Nitto tires San Diego'],
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const GROUPS: { key: ReturnType<typeof brandGroup>; title: string }[] = [
  { key: 'wheel', title: 'Wheels' },
  { key: 'tire', title: 'Tires' },
  { key: 'lift', title: 'Suspension & shocks' },
  { key: 'accessory', title: 'Lighting & accessories' },
];

export default async function BrandsPage() {
  const brands = (await listBrands())?.filter((b) => !HIDDEN_BRANDS.has(b.brand)) ?? [];
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip={`${brands.length || 'All'} brands`} title={<>Shop by <span className="display-italic text-blaze-500">brand</span></>}
        lede="The names we sell and stand behind — wheels, tires, lighting and accessories. Free shipping, or ship to the shop and we install." />
      <section className="container-x space-y-12 py-10 sm:py-14">
        {brands.length === 0 ? <p className="text-stone-750">The brand list is taking a moment — try again shortly.</p> : null}
        {GROUPS.map((g) => {
          const list = brands.filter((b) => brandGroup(b) === g.key);
          if (!list.length) return null;
          return (
            <div key={g.key}>
              <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-stone-850">{g.title}</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {list.map((b) => <BrandTile key={b.brand} b={b} />)}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}

function BrandTile({ b }: { b: BrandRow }) {
  const parts = [b.wheel ? `${b.wheel.toLocaleString()} wheels` : null, b.tire ? `${b.tire.toLocaleString()} tires` : null, b.accessory ? `${b.accessory.toLocaleString()} parts` : null].filter(Boolean);
  return (
    <Link href={`/shop/brands/${brandSlug(b.brand)}`} className="group flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-blaze-500/50">
      <div className="aspect-[4/3] bg-sand-100">
        <ProductImage src={b.image} alt="" kind="accessory" className="h-full w-full object-contain p-4 transition-transform group-hover:scale-[1.04]" />
      </div>
      <div className="p-3.5">
        <p className="font-display text-lg font-bold uppercase leading-tight text-stone-850 group-hover:text-blaze-600">{b.brand}</p>
        <p className="mt-0.5 text-xs text-stone-750/80">{parts.join(' · ')}</p>
      </div>
    </Link>
  );
}
