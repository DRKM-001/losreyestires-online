import { CircleDot, Disc3, Package } from 'lucide-react';

/** Stand-in for a product the vendor hasn't sent a photo of yet. */
export function NoPhoto({ kind, large = false }: { kind: string; large?: boolean }) {
  const Icon = kind === 'wheel' ? Disc3 : kind === 'tire' ? CircleDot : Package;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-stone-750/35">
      <Icon className={large ? 'h-24 w-24' : 'h-14 w-14'} strokeWidth={1.25} aria-hidden="true" />
      <span className="text-[11px] font-bold uppercase tracking-widest">Photo coming soon</span>
    </div>
  );
}
