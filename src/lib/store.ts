// The RavnPro store catalog for this shop (public, read-only). Products,
// stock and prices live in RavnPro (Store → Products); this file only reads.
import { site } from '@/lib/site';

export type StoreItem = {
  id: string;
  sku: string;
  kind: 'wheel' | 'tire' | 'accessory';
  brand: string | null;
  series: string | null;
  model: string | null;
  name: string;
  status: 'active' | 'closeout' | 'coming_soon' | 'discontinued';
  price_cents: number;
  /** The regular price when a sale is on; null otherwise. */
  compare_cents?: number | null;
  sale?: { bp: number; label: string; ends: string | null } | null;
  msrp_cents: number | null;
  available: number;
  eta_30: number;
  spec: Record<string, string | number>;
  image: string | null;
};

export type Facet<T = string> = { v: T; n: number };

export type StoreList = {
  total: number;
  items: StoreItem[];
  sale?: { bp: number; label: string; ends: string | null } | null;
  /** Counted facets (the plain `facets` lists are kept for older builds). */
  facet_counts: {
    brands: Facet[];
    bolt_patterns: Facet[];
    diameters: Facet<number>[];
    widths: Facet<number>[];
    aspects: Facet<number>[];
    treads: Facet[];
    types: Facet[];
    price: { min: number | null; max: number | null };
  };
};

export type Department = { total: number; in_stock: number; brands: Facet[]; image: string | null };
export type Departments = Partial<Record<'wheel' | 'tire' | 'accessory', Department>>;

export type StoreProduct = Omit<StoreItem, 'image'> & {
  upc: string | null;
  description: string | null;
  stock_at: string | null;
  features: string[];
  images: string[];
  freight: Record<string, number>;
  vendor: string;
  ship_flat_cents: number;
  siblings: { id: string; sku: string; finish: string | null; size: string | null; bolt_pattern: string | null; offset_mm: string | null; price_cents: number; available: number; image: string | null }[];
};

export type Sort = 'featured' | 'price_asc' | 'price_desc' | 'newest';
export type StoreFilters = {
  q?: string; kind?: string; brand?: string; bolt_pattern?: string; diameter?: string; width?: string; aspect?: string; tread?: string; type?: string;
  price_min?: number; price_max?: number; sort?: Sort; in_stock?: boolean; limit?: number; offset?: number;
};

export async function listProducts(f: StoreFilters): Promise<StoreList | null> {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(f)) {
    if (v === undefined || v === null || v === '' || v === false) continue;
    p.set(k, v === true ? '1' : String(v));
  }
  try {
    const r = await fetch(`${site.storeApi}/products?${p}`);
    return r.ok ? ((await r.json()) as StoreList) : null;
  } catch (e) {
    console.error('store api: products', String(e));
    return null;
  }
}

export async function listDepartments(): Promise<Departments | null> {
  try {
    const r = await fetch(`${site.storeApi}/departments`);
    return r.ok ? ((await r.json()) as Departments) : null;
  } catch (e) {
    console.error('store api: departments', String(e));
    return null;
  }
}

/** The three departments: URL slug, catalog kind, labels. */
export const DEPARTMENTS = [
  { slug: 'wheels', kind: 'wheel', title: 'Wheels', one: 'wheel', many: 'wheels', blurb: 'Off-road, street and truck wheels from Method, Fuel, KMC, Moto Metal, XD, American Racing and more.' },
  { slug: 'tires', kind: 'tire', title: 'Tires', one: 'tire', many: 'tires', blurb: 'All-terrain, mud-terrain and street tires. Search by size — 275/60R20, 35x12.50R20.' },
  { slug: 'accessories', kind: 'accessory', title: 'Accessories & Lighting', one: 'item', many: 'items', blurb: 'Lug nuts and locks, center caps, LED lighting, TPMS, spacers and more.' },
] as const;
export type Dept = (typeof DEPARTMENTS)[number];
export const deptFor = (kind: string) => DEPARTMENTS.find((d) => d.kind === kind) ?? DEPARTMENTS[2];

export async function getProduct(id: string): Promise<StoreProduct | null> {
  if (!/^[0-9a-f-]{36}$/.test(id)) return null;
  try {
    const r = await fetch(`${site.storeApi}/products/${id}`);
    return r.ok ? ((await r.json()) as StoreProduct) : null;
  } catch (e) {
    console.error('store api: product', String(e));
    return null;
  }
}

export const money = (cents: number) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** "17x8.5 · 6x5.5 · +0 offset · Matte Black" / "275/60R20 · 116T · Trail Grappler" */
export function specLine(p: { kind: string; series?: string | null; spec: Record<string, string | number> }): string {
  const s = p.spec;
  if (p.kind === 'wheel') {
    const off = typeof s.offset_mm === 'number' ? `${s.offset_mm > 0 ? '+' : ''}${s.offset_mm} offset` : null;
    const bolt = s.bolt_pattern && s.bolt_pattern !== 'BLANK' ? s.bolt_pattern : null;
    return [s.size, bolt, off, s.finish ? titleCase(String(s.finish)) : null].filter(Boolean).join(' · ');
  }
  if (p.kind === 'tire') {
    const size = s.size ?? (s.section_mm && s.aspect && s.diameter ? `${s.section_mm}/${s.aspect}R${s.diameter}` : null);
    const service = s.load_index || s.speed_rating ? `${s.load_index ?? ''}${s.speed_rating ?? ''}` : null;
    return [size, service, s.load_range, s.tread ? titleCase(String(s.tread)) : null].filter(Boolean).join(' · ');
  }
  return [p.series && !/^(accessories|misc|auto accessories)$/i.test(p.series) ? titleCase(p.series) : null, s.type, s.thread, s.color].filter(Boolean).map(String).join(' · ');
}

export const titleCase = (s: string) => s.toLowerCase().replace(/(^|[\s/-])([a-z])/g, (m) => m.toUpperCase());

/** What the shipping/availability line says for a product. */
export function availabilityLine(p: { available: number; eta_30: number; status: string }, qty = 1) {
  if (p.available >= qty) return { ok: true, text: 'In stock — ships in 1–3 business days' };
  if (p.available > 0) return { ok: true, text: `Only ${p.available} in stock — the rest ships when it lands` };
  if (p.eta_30 > 0) return { ok: false, text: 'Backordered — more arriving within 30 days' };
  return { ok: false, text: 'Out of stock at the warehouse — WhatsApp us for an ETA' };
}

export type BrandRow = { brand: string; total: number; in_stock: number; wheel: number; tire: number; accessory: number; image: string | null };

export async function listBrands(): Promise<BrandRow[] | null> {
  try {
    const r = await fetch(`${site.storeApi}/brands`);
    return r.ok ? ((await r.json()) as BrandRow[]) : null;
  } catch (e) {
    console.error('store api: brands', String(e));
    return null;
  }
}

/** "American Racing Vintage" → "american-racing-vintage" */
export const brandSlug = (b: string) => b.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Brands that are catalog buckets, not brands people shop for. */
export const HIDDEN_BRANDS = new Set(['Misc Accessories', 'Private Label']);

/** Lift kits stay hidden (no page, no links) until a lift supplier's feed is in. */
export const LIFT_KITS_LIVE = false;

/** The Lift & Level collection: these accessory types (the vendor's "series"). */
export const LIFT_TYPES = ['SST Lift KIT', 'BIG Lift Kits', 'Leveling Kits', 'Rear Kits', 'Suspension', 'Suspension Parts', 'Shocks', 'A-arms', 'Track Bars', 'Steering Kits', 'Rear Coil Spacers', 'Rear Shock Extension'];
export const LIFT_BRANDS = ['ReadyLift Suspension', 'Pro Comp Suspensions', 'Rugged', 'Teraflex', 'Fox Shocks', 'Bilstein', 'Falcon Shocks', 'Ready Air', 'Rubicon Express'];

/** Where a brand mostly lives: wheels, tires, lift & suspension, or lighting & accessories. */
export function brandGroup(b: BrandRow): 'wheel' | 'tire' | 'lift' | 'accessory' {
  if (LIFT_BRANDS.includes(b.brand)) return 'lift';
  if (b.wheel >= b.tire && b.wheel >= b.accessory / 2 && b.wheel > 0) return 'wheel';
  if (b.tire > 0 && b.tire >= b.accessory) return 'tire';
  return 'accessory';
}
