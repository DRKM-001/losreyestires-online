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
  msrp_cents: number | null;
  available: number;
  eta_30: number;
  spec: Record<string, string | number>;
  image: string | null;
};

export type StoreList = {
  total: number;
  items: StoreItem[];
  facets: { brands: string[]; bolt_patterns: string[]; diameters: number[] };
};

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

export type StoreFilters = { q?: string; kind?: string; brand?: string; bolt_pattern?: string; diameter?: string; in_stock?: boolean; limit?: number; offset?: number };

export async function listProducts(f: StoreFilters): Promise<StoreList | null> {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.kind) p.set('kind', f.kind);
  if (f.brand) p.set('brand', f.brand);
  if (f.bolt_pattern) p.set('bolt_pattern', f.bolt_pattern);
  if (f.diameter) p.set('diameter', f.diameter);
  if (f.in_stock) p.set('in_stock', '1');
  if (f.limit) p.set('limit', String(f.limit));
  if (f.offset) p.set('offset', String(f.offset));
  try {
    const r = await fetch(`${site.storeApi}/products?${p}`);
    return r.ok ? ((await r.json()) as StoreList) : null;
  } catch (e) {
    console.error('store api: products', String(e));
    return null;
  }
}

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

/** "17x8.5 · 6x5.5 · 0 offset · Matte Black" */
export function specLine(p: { kind: string; spec: Record<string, string | number> }): string {
  const s = p.spec;
  if (p.kind === 'wheel') {
    const off = typeof s.offset_mm === 'number' ? `${s.offset_mm > 0 ? '+' : ''}${s.offset_mm} offset` : null;
    return [s.size, s.bolt_pattern, off, s.finish ? titleCase(String(s.finish)) : null].filter(Boolean).join(' · ');
  }
  if (p.kind === 'tire') return [s.section_mm && s.aspect && s.diameter ? `${s.section_mm}/${s.aspect}R${s.diameter}` : null, s.load_range, s.tread].filter(Boolean).join(' · ');
  return [s.type, s.thread, s.color].filter(Boolean).map(String).join(' · ');
}

export const titleCase = (s: string) => s.toLowerCase().replace(/(^|[\s/-])([a-z])/g, (m) => m.toUpperCase());

/** What the shipping/availability line says for a product. */
export function availabilityLine(p: { available: number; eta_30: number; status: string }, qty = 1) {
  if (p.available >= qty) return { ok: true, text: 'In stock at the warehouse — ships in 1–3 business days' };
  if (p.available > 0) return { ok: true, text: `Only ${p.available} in stock — the rest ships when it lands` };
  if (p.eta_30 > 0) return { ok: false, text: `Backordered — ${p.eta_30} arriving within 30 days` };
  return { ok: false, text: 'Out of stock — WhatsApp us for an ETA' };
}
