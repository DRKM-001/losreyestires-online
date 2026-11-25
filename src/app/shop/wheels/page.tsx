import { PageHero } from '@/components/layout/PageHero';
import { Catalog } from '@/components/shop/Catalog';
import { generatePageMetadata } from '@/lib/metadata';
import { deptFor } from '@/lib/store';

const dept = deptFor('wheel');

export const metadata = generatePageMetadata({
  title: 'Wheels — Method, Fuel, KMC, XD & More',
  description: 'Shop thousands of off-road, truck and street wheels. Filter by bolt pattern, diameter and width. Free shipping, or ship to Los Reyes Tires in El Cajon for mounting.',
  path: '/shop/wheels',
});

// Cloudflare Pages: server-rendered on the edge; stock is fresh on every view (the catalog API caches for 5 minutes).
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip="Free shipping" title={<>Shop <span className="display-italic text-blaze-500">{dept.title}</span></>} lede={dept.blurb} />
      <Catalog dept={dept} sp={await searchParams} />
    </main>
  );
}
