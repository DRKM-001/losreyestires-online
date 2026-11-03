import Link from 'next/link';
import { Building2, CircleDot, CreditCard, Disc3, MessageCircleQuestion, Recycle, Truck, Wrench } from 'lucide-react';
import { ShopWaLink } from '@/components/brand/ShopWaLink';
import { WhatsAppIcon } from '@/components/brand/WhatsAppIcon';

const items = [
  { title: 'New tires', desc: 'Major brands in common and hard-to-find sizes, ordered fast when we don’t have them.', href: '/tires', Icon: CircleDot },
  { title: 'Used tires', desc: 'Inspected used tires with real tread left. Send the size, we check today’s stock.', href: '/#quote', Icon: Recycle },
  { title: 'Wheels', desc: 'Wheels and wheel-and-tire packages for trucks, Jeeps and cars.', href: '/wheels', Icon: Disc3 },
  { title: 'Install & balance', desc: 'Mounting, balancing and rotation while you wait. No appointment needed.', href: '/#quote', Icon: Wrench },
  { title: 'Fleet service', desc: 'Accounts for work trucks, vans and business fleets.', href: '/fleet', Icon: Building2 },
  { title: 'Tire hauling', desc: 'Waste-tire pickup for dealers and shops across San Diego County.', href: '/hauling', Icon: Truck },
  { title: 'Financing', desc: 'Financing through Snap Finance or Acima, with no-credit-needed options.', href: '/financing', Icon: CreditCard },
];

export function ServicesGrid() {
  return (
    <section id="services" className="scroll-mt-24 bg-sand-50 py-20 sm:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-blaze-600">What we do</p>
          <h2 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight text-stone-850 sm:text-5xl">Start with what you need</h2>
          <p className="mt-4 text-lg text-stone-750">Walk in, call, or send a WhatsApp. The El Cajon team checks stock and gives you a straight price.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, desc, href, Icon }) => (
            <Link key={title} href={href} className="group block rounded-xl border border-sand-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-blaze-500/50">
              <div className="clip-slash flex h-12 w-12 items-center justify-center bg-blaze-50 text-blaze-600 transition-colors group-hover:bg-blaze-500 group-hover:text-white">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide text-stone-850">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone-750">{desc}</p>
            </Link>
          ))}
          <ShopWaLink className="group flex flex-col rounded-xl border border-ink-900 bg-ink-900 p-6 text-sand-50 shadow-card transition-all hover:-translate-y-1">
            <div className="clip-slash flex h-12 w-12 items-center justify-center bg-blaze-500 text-white"><MessageCircleQuestion className="h-6 w-6" /></div>
            <h3 className="mt-5 font-display text-xl font-semibold uppercase tracking-wide">Something else?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-sand-200/80">Ask us anything about your tires or wheels. A real person answers.</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-bold uppercase tracking-wide text-wa-500"><WhatsAppIcon className="h-4 w-4" />Ask on WhatsApp</span>
          </ShopWaLink>
        </div>
      </div>
    </section>
  );
}
