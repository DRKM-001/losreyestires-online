import Link from 'next/link';
import { Search, SlidersHorizontal } from 'lucide-react';
import { FilterForm } from '@/components/shop/FilterForm';
import { FilterPanel } from '@/components/shop/FilterPanel';
import { ProductCard } from '@/components/shop/ProductCard';
import { DEPARTMENTS, listProducts, type Dept, type Facet, type Sort, type StoreFilters } from '@/lib/store';

const PAGE = 48;
type SP = Record<string, string | undefined>;

const SORTS: [Sort, string][] = [['featured', 'Featured'], ['price_asc', 'Price: low to high'], ['price_desc', 'Price: high to low'], ['newest', 'Newest']];
const fmtNum = (n: string | number) => String(Number(n));

/** One department's listing (or a search across all of them when dept is null). Everything rides in the URL. */
export async function Catalog({ dept, sp, base: baseOverride, fixed = {}, depts = false }: {
  dept: Dept | null;
  sp: SP;
  /** Page path the filters and pages link to (defaults to the department's). */
  base?: string;
  /** Filters the page itself sets: a brand page's brand, a collection's types. */
  fixed?: { brand?: string; type?: string };
  /** Show Wheels / Tires / Accessories tabs (brand pages). */
  depts?: boolean;
}) {
  const v = (k: string, max = 60) => (sp[k] ?? '').trim().slice(0, max);
  const q = v('q', 80);
  const f = {
    brand: v('brand'), bolt: v('bolt', 16), dia: v('dia', 6), width: v('width', 6), aspect: v('aspect', 6),
    tread: v('tread'), type: v('type'), min: v('min', 7), max: v('max', 7), sort: (v('sort') || 'featured') as Sort, stock: sp.stock === '1',
  };
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const dollars = (s: string) => (/^\d+$/.test(s) ? Number(s) * 100 : undefined);
  const filters: StoreFilters = {
    q, kind: dept?.kind, brand: fixed.brand ?? f.brand, bolt_pattern: f.bolt, diameter: f.dia, width: f.width, aspect: f.aspect, tread: f.tread, type: f.type || fixed.type,
    price_min: dollars(f.min), price_max: dollars(f.max), sort: f.sort === 'featured' ? undefined : f.sort, in_stock: f.stock, limit: PAGE, offset: (page - 1) * PAGE,
  };
  const data = await listProducts(filters);
  const base = baseOverride ?? (dept ? `/shop/${dept.slug}` : '/shop/search');
  const current: Record<string, string> = Object.fromEntries(
    Object.entries({ q, dept: depts && dept ? dept.slug : '', brand: f.brand, bolt: f.bolt, dia: f.dia, width: f.width, aspect: f.aspect, tread: f.tread, type: f.type, min: f.min, max: f.max, sort: f.sort === 'featured' ? '' : f.sort, stock: f.stock ? '1' : '' }).filter(([, x]) => x),
  );
  const link = (patch: Record<string, string>) => {
    const p = new URLSearchParams(current);
    for (const [k, x] of Object.entries(patch)) {
      if (x) p.set(k, x);
      else p.delete(k);
    }
    const s = p.toString();
    return `${base}${s ? `?${s}` : ''}`;
  };
  const active = Object.keys(current).filter((k) => k !== 'sort' && k !== 'q').length > 0;
  const pages = data ? Math.max(1, Math.ceil(data.total / PAGE)) : 1;
  const noun = dept ? (data?.total === 1 ? dept.one : dept.many) : data?.total === 1 ? 'product' : 'products';
  const fc = data?.facet_counts;
  const kind = dept?.kind;

  const select = (name: string, label: string, value: string, opts: Facet<string | number>[] | undefined, show: (x: string | number) => string = String) => (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-bold uppercase tracking-widest text-stone-750/70">{label}</span>
      <select name={name} defaultValue={value} className="h-10 rounded-md border border-sand-300 bg-white px-2.5 text-sm text-stone-850 focus:border-blaze-500 focus:outline-none">
        <option value="">Any</option>
        {value && !(opts ?? []).some((o) => String(o.v) === value) ? <option value={value}>{show(value)}</option> : null}
        {(opts ?? []).map((o) => <option key={String(o.v)} value={String(o.v)}>{show(o.v)} ({o.n.toLocaleString()})</option>)}
      </select>
    </label>
  );

  const filterFields = (
    <>
      {kind === 'tire' ? (
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
          {select('width', 'Width', f.width, fc?.widths, fmtNum)}
          {select('aspect', 'Profile', f.aspect, fc?.aspects, fmtNum)}
          {select('dia', 'Rim', f.dia, fc?.diameters, (x) => `${fmtNum(Number(x))}"`)}
        </div>
      ) : null}
      {kind === 'wheel' ? (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
          {select('dia', 'Diameter', f.dia, fc?.diameters, (x) => `${fmtNum(Number(x))}"`)}
          {select('width', 'Width', f.width, fc?.widths, (x) => `${fmtNum(Number(x))}"`)}
        </div>
      ) : null}
      {kind === 'wheel' ? select('bolt', 'Bolt pattern', f.bolt, fc?.bolt_patterns) : null}
      {kind === 'accessory' ? select('type', 'Type', f.type, fc?.types) : null}
      {depts && dept ? <input type="hidden" name="dept" value={dept.slug} /> : null}
      {kind === 'tire' ? select('tread', 'Tire line', f.tread, fc?.treads) : null}
      {fixed.brand ? null : select('brand', 'Brand', f.brand, fc?.brands)}
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-stone-750/70">Price each ($)</span>
        <div className="flex items-center gap-2">
          <input name="min" defaultValue={f.min} inputMode="numeric" placeholder="Min" aria-label="Minimum price" className="h-10 w-full min-w-0 rounded-md border border-sand-300 bg-white px-2.5 text-sm focus:border-blaze-500 focus:outline-none" />
          <span className="text-stone-750/50">–</span>
          <input name="max" defaultValue={f.max} inputMode="numeric" placeholder="Max" aria-label="Maximum price" className="h-10 w-full min-w-0 rounded-md border border-sand-300 bg-white px-2.5 text-sm focus:border-blaze-500 focus:outline-none" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold text-stone-850">
        <input type="checkbox" name="stock" value="1" defaultChecked={f.stock} className="h-4 w-4 accent-[var(--color-blaze-500)]" />
        In stock only
      </label>
      <button type="submit" className="h-10 rounded-md bg-stone-850 px-4 text-sm font-bold uppercase tracking-wide text-sand-50 hover:bg-stone-750">Apply</button>
      {active ? <Link href={`${base}${depts && dept ? `?dept=${dept.slug}` : ''}`} className="text-center text-sm font-semibold text-blaze-600">Clear filters</Link> : null}
    </>
  );

  return (
    <section className="container-x py-8 sm:py-10">
      <FilterForm action={base} className="grid gap-6 lg:grid-cols-[240px_1fr] lg:gap-8">
        <aside>
          <FilterPanel defaultOpen={active} summary={<><SlidersHorizontal className="h-4 w-4" />Filter{active ? <span className="text-blaze-600 lg:hidden"> · on</span> : null}</>}>
            {filterFields}
          </FilterPanel>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-750/50" aria-hidden="true" />
              <input name="q" defaultValue={q} aria-label={`Search ${dept ? dept.many : 'the shop'}`}
                placeholder={kind === 'tire' ? 'Size or model — 275/60R20, 35x12.50R20, KO2…' : kind === 'wheel' ? 'Model, part number — MR305, Fuel Rebel, 703…' : kind === 'accessory' ? 'Lug nuts, lift kit, light bar, part number…' : 'Search wheels, tires and accessories'}
                className="h-11 w-full rounded-md border border-sand-300 bg-white pl-9 pr-3 text-stone-850 placeholder:text-stone-750/50 focus:border-blaze-500 focus:outline-none" />
            </div>
            <label className="flex items-center gap-2 text-sm text-stone-750">
              <span className="sr-only sm:not-sr-only">Sort</span>
              <select name="sort" defaultValue={f.sort} className="h-11 rounded-md border border-sand-300 bg-white px-2.5 text-sm text-stone-850 focus:border-blaze-500 focus:outline-none">
                {SORTS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </label>
          </div>

          {depts ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={base} aria-current={!dept ? 'page' : undefined} className={!dept ? 'rounded-full bg-stone-850 px-3.5 py-1.5 text-sm font-semibold text-sand-50' : 'rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 hover:border-blaze-500'}>Everything</Link>
              {DEPARTMENTS.map((d) => (
                <Link key={d.slug} href={`${base}?dept=${d.slug}`} aria-current={dept?.slug === d.slug ? 'page' : undefined}
                  className={dept?.slug === d.slug ? 'rounded-full bg-stone-850 px-3.5 py-1.5 text-sm font-semibold text-sand-50' : 'rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 hover:border-blaze-500'}>{d.title}</Link>
              ))}
            </div>
          ) : !dept ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {DEPARTMENTS.map((d) => (
                <Link key={d.slug} href={`/shop/${d.slug}${q ? `?q=${encodeURIComponent(q)}` : ''}`} className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 hover:border-blaze-500">Only {d.title.toLowerCase()}</Link>
              ))}
            </div>
          ) : null}

          <p className="mt-4 text-sm text-stone-750/80" aria-live="polite">
            {data ? `${data.total.toLocaleString()} ${noun}${q ? ` for “${q}”` : ''}` : 'The catalog is taking a moment — try again shortly.'}
            {data && pages > 1 ? ` · page ${page} of ${pages.toLocaleString()}` : ''}
          </p>

          {data?.items.length ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {data.items.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          ) : data ? (
            <div className="mt-8 rounded-xl border border-sand-200 bg-white p-8 text-center shadow-card">
              <p className="font-display text-2xl font-bold uppercase text-stone-850">Nothing matches</p>
              <p className="mt-2 text-stone-750">Loosen a filter, or WhatsApp us the year, make and model — we can order almost anything.</p>
            </div>
          ) : null}

          {pages > 1 ? (
            <nav aria-label="Pages" className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {page > 1 ? <Link href={link({ page: page - 1 > 1 ? String(page - 1) : '' })} className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 hover:border-blaze-500">← Previous</Link> : null}
              {pageList(page, pages).map((n, i) => n === 0
                ? <span key={`gap${i}`} className="px-1 text-stone-750/50">…</span>
                : <Link key={n} href={link({ page: n > 1 ? String(n) : '' })} aria-current={n === page ? 'page' : undefined}
                    className={n === page ? 'rounded-full bg-stone-850 px-3.5 py-1.5 text-sm font-semibold text-sand-50' : 'rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 hover:border-blaze-500'}>{n}</Link>)}
              {page < pages ? <Link href={link({ page: String(page + 1) })} className="rounded-full border border-sand-300 bg-white px-3.5 py-1.5 text-sm font-semibold text-stone-750 hover:border-blaze-500">Next →</Link> : null}
            </nav>
          ) : null}
        </div>
      </FilterForm>
    </section>
  );
}

/** 1 … 4 5 [6] 7 8 … 40 — 0 marks a gap. */
function pageList(page: number, pages: number): number[] {
  const set = new Set([1, pages, page - 2, page - 1, page, page + 1, page + 2].filter((n) => n >= 1 && n <= pages));
  const sorted = [...set].sort((a, b) => a - b);
  const out: number[] = [];
  sorted.forEach((n, i) => {
    if (i && n - sorted[i - 1] > 1) out.push(0);
    out.push(n);
  });
  return out;
}
