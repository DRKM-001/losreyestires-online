import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { Catalog } from '@/components/shop/Catalog';
import { generatePageMetadata } from '@/lib/metadata';
import { brandGroup, brandSlug, DEPARTMENTS, listBrands } from '@/lib/store';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

async function findBrand(slug: string) {
  return (await listBrands())?.find((b) => brandSlug(b.brand) === slug) ?? null;
}

const noun = { wheel: 'wheels', tire: 'tires', lift: 'suspension & shocks', accessory: 'lighting & accessories' } as const;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = await findBrand((await params).slug);
  if (!b) return { title: 'Brand not found' };
  const what = noun[brandGroup(b)];
  return generatePageMetadata({
    title: `${b.brand} ${what.charAt(0).toUpperCase() + what.slice(1)} — El Cajon & San Diego`,
    description: `Shop ${b.total.toLocaleString()} ${b.brand} products online at Los Reyes Tires: ${b.in_stock.toLocaleString()} in stock, free shipping, or ship to our El Cajon shop and we install.`,
    path: `/shop/brands/${brandSlug(b.brand)}`,
    keywords: [`${b.brand} ${what}`, `${b.brand} El Cajon`, `${b.brand} San Diego`],
  });
}

export default async function BrandPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const b = await findBrand(slug);
  if (!b) notFound();
  // Departments this brand actually has; open on its main one.
  const has = DEPARTMENTS.filter((d) => b[d.kind] > 0);
  const main = brandGroup(b);
  const dept = has.find((d) => d.slug === sp.dept) ?? (sp.dept === 'all' || has.length === 0 ? null : has.find((d) => d.kind === (main === 'lift' ? 'accessory' : main)) ?? has[0]);
  const what = noun[main];

  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip={`${b.in_stock.toLocaleString()} in stock`} title={<>{b.brand} <span className="display-italic text-blaze-500">{what}</span></>}
        lede={`Every ${b.brand} part we can ship — ${b.total.toLocaleString()} in all. Free shipping to your door, or ship to our El Cajon shop and we mount, balance and install.`}>
        <Link href="/shop/brands" className="inline-flex items-center gap-1 text-sm font-semibold text-sand-200 hover:text-white"><ChevronLeft className="h-4 w-4" />All brands</Link>
      </PageHero>
      <Catalog dept={dept} sp={sp} base={`/shop/brands/${slug}`} fixed={{ brand: b.brand }} depts={has.length > 1} />
    </main>
  );
}
