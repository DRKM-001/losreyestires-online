import { PageHero } from '@/components/layout/PageHero';
import { Catalog } from '@/components/shop/Catalog';
import { generatePageMetadata } from '@/lib/metadata';
import { deptFor } from '@/lib/store';

const dept = deptFor('tire');

export const metadata = generatePageMetadata({
  title: 'Tires — All-Terrain, Mud-Terrain & Street',
  description: 'Shop tires by size: width, profile and rim. Free shipping, or ship to Los Reyes Tires in El Cajon and we mount and balance.',
  path: '/shop/tires',
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
