import { PageHero } from '@/components/layout/PageHero';
import { Catalog } from '@/components/shop/Catalog';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = { ...generatePageMetadata({
  title: 'Search the Shop',
  description: 'Search every wheel, tire and accessory we sell online.',
  path: '/shop/search',
}), robots: { index: false, follow: true } };

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip="Search" title={<>Search the <span className="display-italic text-blaze-500">shop</span></>} lede="Wheels, tires, accessories and lighting — every part we can ship." />
      <Catalog dept={null} sp={await searchParams} />
    </main>
  );
}
