// The current promotion. Dates are the shop's wall clock (Pacific); the
// components below read the phase at render time in the browser, so the
// teaser, the live banner and the quiet period switch over without a deploy.
// Prices themselves come off in RavnPro (Store → Vendors → Sale), not here.

export const promo = {
  key: 'mrw-bfcm-2026',
  brand: 'Method Race Wheels',
  headline: '20% off all Method wheels',
  sub: 'Black Friday through Cyber Monday · 5 days only',
  dates: 'Nov 26 – Nov 30',
  from: new Date('2026-11-26T00:00:00-08:00'),
  to: new Date('2026-12-01T00:00:00-08:00'),
  href: '/shop',
  images: {
    feed: ['/promo/mrw-bfcm-feed-1.jpg', '/promo/mrw-bfcm-feed-2.jpg', '/promo/mrw-bfcm-feed-3.jpg'],
    story: ['/promo/mrw-bfcm-story-1.jpg', '/promo/mrw-bfcm-story-2.jpg'],
  },
  /** Show the teaser this many days before it starts. */
  teaseDays: 10,
} as const;

export type PromoPhase = 'before' | 'live' | 'after' | 'off';

export function promoPhase(now: Date = new Date()): PromoPhase {
  if (now >= promo.to) return 'after';
  if (now >= promo.from) return 'live';
  if (now >= new Date(promo.from.getTime() - promo.teaseDays * 86400000)) return 'before';
  return 'off';
}

export function promoEndsIn(now: Date = new Date()): string {
  const ms = promo.to.getTime() - now.getTime();
  if (ms <= 0) return '';
  const h = Math.floor(ms / 3600000);
  if (h >= 48) return `${Math.ceil(h / 24)} days left`;
  if (h >= 1) return `${h}h left`;
  return `${Math.max(1, Math.floor(ms / 60000))} min left`;
}
