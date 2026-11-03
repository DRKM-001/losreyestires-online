import type { ReactNode } from 'react';

/** Dark page header in the Reyes family style: chip, big Oswald headline, speed bar, lede, optional actions. */
export function PageHero({ chip, title, lede, children }: { chip: string; title: ReactNode; lede?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(209,31,39,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-grain opacity-[0.08]" />
      <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-stripes opacity-25 [mask-image:linear-gradient(to_left,black,transparent)] lg:block" />
      <div className="absolute inset-x-0 top-0 h-1 bg-blaze-500" />
      <div className="container-x relative py-12 sm:py-16">
        <span className="clip-slash inline-block bg-blaze-500 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-white">{chip}</span>
        <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-sand-50 text-balance sm:text-6xl">{title}</h1>
        <span className="speed-bar mt-5 w-28 bg-blaze-500" />
        {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-200/90">{lede}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

/** Button styles that read well on the dark header. */
export const heroBtn = {
  primary: 'inline-flex items-center gap-2 rounded-md bg-blaze-500 px-6 py-3.5 font-bold uppercase tracking-wide text-white shadow-blaze transition-colors hover:bg-blaze-600',
  ghost: 'inline-flex items-center gap-2 rounded-md border border-sand-200/25 px-6 py-3.5 font-semibold text-sand-50 transition-colors hover:bg-sand-50/5',
  wa: 'inline-flex items-center gap-2 rounded-md bg-wa-500 px-6 py-3.5 font-bold uppercase tracking-wide text-ink-950 transition-colors hover:bg-wa-600',
};
