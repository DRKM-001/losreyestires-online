import Link from 'next/link';
import { CircleDot, Clock, Recycle, Ruler, ShieldCheck, ShoppingCart, Wrench } from 'lucide-react';
import { QuoteBox } from '@/components/brand/QuoteBox';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';
import { BrandMarquee } from '@/components/home/BrandMarquee';
import { PageHero, heroBtn } from '@/components/layout/PageHero';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'New & Used Tires in El Cajon',
  description:
    'New and used tires in El Cajon, CA. Send your tire size and Los Reyes Tires answers with what is in stock and the out-the-door price. Mounting and balancing while you wait.',
  path: '/tires',
  keywords: ['tires El Cajon', 'used tires El Cajon', 'new tires El Cajon', 'tire shop El Cajon', 'cheap tires San Diego'],
});

// Quote-driven: the shop's stock changes daily, so the page asks for the size
// and the team answers from the counter (RavnPro inbox / WhatsApp) instead of
// showing a catalog.
const steps = [
  { Icon: Ruler, title: 'Send your size', desc: 'It’s printed on the sidewall, like 225/45R17 or 35x12.50R18. A photo works too.' },
  { Icon: Clock, title: 'We check today’s stock', desc: 'New and used, by size and brand. You get an out-the-door price, installed.' },
  { Icon: Wrench, title: 'Drive in, drive out', desc: 'Mounted and balanced while you wait. No appointment needed, open 7 days.' },
];

const offer = [
  { Icon: CircleDot, title: 'New tires', desc: 'Major brands in common and hard-to-find sizes. If it’s not on the rack, we order it fast.' },
  { Icon: Recycle, title: 'Used tires', desc: 'Inspected, with real tread left. The honest option when you need the car moving today.' },
  { Icon: ShieldCheck, title: 'Straight pricing', desc: 'Mounting, balancing and the CA tire fee are on the quote. No surprises at the counter.' },
];

export default function TiresPage() {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        chip="New & used tires"
        title={
          <>
            Send your size, <span className="display-italic text-blaze-500">get a price</span>
          </>
        }
        lede="Tell us the size and whether you want new, used or either. The El Cajon team checks what’s on the rack today and answers with the installed price."
      >
        <a href="#quote" className={heroBtn.primary}>
          <Ruler className="h-4 w-4" aria-hidden="true" />
          Get a tire quote
        </a>
        <ShopWaLink className={heroBtn.wa}>
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </ShopWaLink>
        <Link href="/shop/tires" className={heroBtn.ghost}>
          <ShoppingCart className="h-4 w-4 text-blaze-400" aria-hidden="true" />
          Shop tires online
        </Link>
      </PageHero>

      <section id="quote" className="scroll-mt-24 py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_440px] lg:items-start">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-stone-850 sm:text-5xl">Three steps, one visit</h2>
            <ol className="mt-8 space-y-6">
              {steps.map(({ Icon, title, desc }, i) => (
                <li key={title} className="flex gap-4">
                  <div className="clip-slash flex h-12 w-12 flex-none items-center justify-center bg-blaze-50 text-blaze-600">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-stone-850">
                      <span className="mr-2 text-blaze-500">{i + 1}.</span>
                      {title}
                    </h3>
                    <p className="mt-1 text-stone-750">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-stone-750">
              Not sure where the size is?{' '}
              <Link href="/encyclopedia" className="font-semibold text-blaze-600 underline-offset-2 hover:underline">
                Here’s how to read a sidewall
              </Link>
              .
            </p>
          </div>
          <div className="lg:sticky lg:top-24">
            <QuoteBox mode="tires" />
          </div>
        </div>
      </section>

      <section className="pb-12 sm:pb-16">
        <div className="container-x">
          <div className="rounded-xl border border-sand-200 bg-white p-6 shadow-card sm:p-8">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">Or order online</p>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-stone-850 sm:text-4xl">Shop new tires by size</h2>
            <p className="mt-2 max-w-2xl text-stone-750">Toyo, Nitto, Falken, Mickey Thompson, Maxxis and more — free shipping, or ship to the shop and we mount and balance.</p>
            <form action="/shop/tires" className="mt-5 flex flex-wrap items-end gap-3">
              {[['width', 'Width', '275'], ['aspect', 'Profile', '60'], ['dia', 'Rim', '20']].map(([name, label, ph]) => (
                <label key={name} className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-stone-750/70">{label}</span>
                  <input name={name} inputMode="decimal" placeholder={ph} className="h-11 w-24 rounded-md border border-sand-300 bg-white px-3 font-display text-xl font-bold text-stone-850 placeholder:text-stone-750/30 focus:border-blaze-500 focus:outline-none" />
                </label>
              ))}
              <button type="submit" className="h-11 rounded-md bg-blaze-500 px-6 font-bold uppercase tracking-wide text-white hover:bg-blaze-600">Find tires</button>
              <Link href="/shop/tires?q=35x12.50" className="pb-3 text-sm font-semibold text-blaze-600">Flotation sizes (35x12.50…) →</Link>
            </form>
          </div>
        </div>
      </section>

      <BrandMarquee />

      <section className="py-14 sm:py-16">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-3">
            {offer.map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-sand-200 bg-white p-6 shadow-card">
                <div className="clip-slash flex h-12 w-12 items-center justify-center bg-blaze-50 text-blaze-600">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-stone-850">{title}</h3>
                <p className="mt-2 text-stone-750">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/wheels" className="inline-flex items-center gap-2 rounded-md border border-sand-300 px-5 py-3 font-semibold text-stone-850 transition-colors hover:border-blaze-500">
              Looking for wheels?
            </Link>
            <Link href="/financing" className="inline-flex items-center gap-2 rounded-md border border-sand-300 px-5 py-3 font-semibold text-stone-850 transition-colors hover:border-blaze-500">
              Financing options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
