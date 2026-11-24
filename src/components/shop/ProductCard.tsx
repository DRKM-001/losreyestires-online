import Link from 'next/link';
import { money, specLine, type StoreItem } from '@/lib/store';

export function ProductCard({ p }: { p: StoreItem }) {
  const sale = p.msrp_cents && p.msrp_cents > p.price_cents;
  return (
    <Link href={`/shop/${p.id}`} className="group flex flex-col overflow-hidden rounded-xl border border-sand-200 bg-white shadow-card transition-all hover:-translate-y-1 hover:border-blaze-500/50">
      <div className="relative aspect-square bg-sand-100">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-contain p-4 transition-transform group-hover:scale-[1.03]" />
        ) : null}
        {p.status === 'closeout' ? <span className="absolute left-3 top-3 clip-slash bg-blaze-500 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-white">Closeout</span> : null}
        {p.available === 0 ? <span className="absolute right-3 top-3 rounded-full bg-stone-850 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-sand-50">Backorder</span> : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-stone-750/60">{p.brand}</p>
        <h3 className="font-display text-xl font-bold uppercase leading-tight text-stone-850">{p.model ?? p.name}</h3>
        <p className="text-sm text-stone-750">{specLine(p)}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="font-display text-2xl font-bold text-stone-850">{money(p.price_cents)}</span>
          {sale ? <span className="text-sm text-stone-750/60 line-through">{money(p.msrp_cents!)}</span> : null}
          <span className="ml-auto text-xs text-stone-750/70">{p.available > 0 ? `${p.available} in stock` : p.eta_30 > 0 ? `${p.eta_30} coming` : 'Sold out'}</span>
        </div>
      </div>
    </Link>
  );
}
