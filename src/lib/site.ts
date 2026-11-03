// One place for the El Cajon shop's details. Every section reads from here.
export const site = {
  name: 'Los Reyes Tires',
  slogan: 'Family owned since 2005',
  city: 'El Cajon, CA',
  phone: '619-440-6098',
  phoneHref: 'tel:+16194406098',
  whatsapp: '16197299468', // wa.me format
  whatsappDisplay: '(619) 729-9468',
  address: '1245 N 1st St, El Cajon, CA 92021',
  street: '1245 N 1st St',
  mapsHref: 'https://maps.google.com/?q=1245+N+1st+St+El+Cajon+CA+92021',
  mapEmbed: 'https://www.google.com/maps?q=1245+N+1st+St,+El+Cajon,+CA+92021&output=embed',
  reviewHref: 'https://g.page/r/CVxUx3jWbjPzEAE/review',
  instagram: 'https://www.instagram.com/losreyestires',
  facebook: 'https://www.facebook.com/losreyestires',
  yelp: 'https://www.yelp.com/biz/los-reyes-tire-shop-el-cajon',
  email: 'sales@losreyestires.com',
  timeZone: 'America/Los_Angeles',
  // [opens, closes] in shop-local hours, indexed by day (0 = Sunday)
  hours: [
    [8, 15],
    [7, 19],
    [7, 19],
    [7, 19],
    [7, 19],
    [7, 19],
    [7, 19],
  ] as [number, number][],
  hoursShort: [
    { d: 'Mon–Sat', t: '7AM–7PM' },
    { d: 'Sunday', t: '8AM–3PM' },
  ],
  brands: ['Michelin', 'BFGoodrich', 'Goodyear', 'Bridgestone', 'Continental', 'Method', 'Fuel', 'TSW'],
} as const;

export type OpenState = {
  open: boolean;
  day: number;
  closesAt?: number;
  opensDay?: number;
  opensAt?: number;
};

/** Shop-local day and hour, worked out in the shop's time zone. */
export function shopNow(date = new Date()): { day: number; hour: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.timeZone, weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false,
  }).formatToParts(date);
  const o: Record<string, string> = {};
  parts.forEach((p) => (o[p.type] = p.value));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday);
  return { day, hour: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
}

export function openState(date = new Date()): OpenState {
  const { day, hour } = shopNow(date);
  const [o, c] = site.hours[day];
  if (hour >= o && hour < c) return { open: true, day, closesAt: c };
  const d = hour < o ? day : (day + 1) % 7;
  return { open: false, day, opensDay: d, opensAt: site.hours[d][0] };
}

export const fmtHour = (h: number) => `${h % 12 || 12}${h < 12 ? 'AM' : 'PM'}`;

/** Contact-tap events to Google Analytics 4. Never throws. */
export function track(event: string, data: Record<string, string> = {}) {
  try {
    const w = window as Window & { gtag?: (...a: unknown[]) => void };
    w.gtag?.('event', event, { page_path: location.pathname, ...data });
  } catch { /* never break a click */ }
}
