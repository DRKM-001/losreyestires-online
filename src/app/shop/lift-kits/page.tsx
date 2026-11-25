import Link from 'next/link';
import { Phone } from 'lucide-react';
import { PageHero, heroBtn } from '@/components/layout/PageHero';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { site } from '@/lib/site';
import { Catalog } from '@/components/shop/Catalog';
import { generatePageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import { brandSlug, deptFor, LIFT_BRANDS, LIFT_KITS_LIVE, LIFT_TYPES } from '@/lib/store';

export const metadata = generatePageMetadata({
  title: 'Lift Kits & Leveling Kits — ReadyLift, Pro Comp, Rugged',
  description: 'Lift kits, leveling kits, shocks and suspension parts from ReadyLift, Pro Comp, Rugged, Teraflex, Fox and Bilstein. Free shipping, or ship to Los Reyes Tires in El Cajon.',
  path: '/shop/lift-kits',
  keywords: ['lift kits El Cajon', 'leveling kit San Diego', 'ReadyLift', 'Pro Comp lift kit', 'truck lift kit San Diego'],
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function LiftKitsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  if (!LIFT_KITS_LIVE) notFound();
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero chip="Lift & level" title={<>Lift kits & <span className="display-italic text-blaze-500">leveling kits</span></>}
        lede="Level the front, go big with a full lift, or upgrade shocks — then put the wheels and tires on it. Kits are vehicle-specific: send us the year, make and model and we'll quote the right kit, plus wheels, tires and alignment.">
        <ShopWaLink className={heroBtn.wa}><WhatsAppIcon className="h-4 w-4" />Get a lift quote</ShopWaLink>
        <a href={site.phoneHref} className={heroBtn.ghost}><Phone className="h-4 w-4 text-blaze-400" aria-hidden="true" />Call {site.phone}</a>
        <div className="flex w-full flex-wrap gap-2">
          {LIFT_BRANDS.map((b) => (
            <Link key={b} href={`/shop/brands/${brandSlug(b)}`} className="rounded-full border border-sand-200/25 px-3 py-1 text-xs font-semibold text-sand-200 hover:border-blaze-500 hover:text-white">{b.replace(/ Suspensions?$| Shocks$/, '')}</Link>
          ))}
        </div>
      </PageHero>
      <Catalog dept={deptFor('accessory')} sp={await searchParams} base="/shop/lift-kits" fixed={{ type: LIFT_TYPES.join('|') }} />
    </main>
  );
}
