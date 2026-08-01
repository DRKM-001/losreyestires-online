'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProductCard } from '@/components/products/ProductCard';
import {
  fetchTires,
  isValidTire,
  mapTireRavenItemToTire,
  type Tire,
  type TireRavenPagination,
} from '@/lib/api/tireraven';

const PAGE_SIZE = 24;
const MAX_PAGE = 100;

type CatalogState =
  | { status: 'loading'; tires: Tire[]; pagination: null }
  | { status: 'ready'; tires: Tire[]; pagination: TireRavenPagination }
  | { status: 'unavailable'; tires: Tire[]; pagination: null };

function getPage(value: string | null) {
  if (!value || !/^\d+$/.test(value)) return 1;
  const parsed = Number(value);
  return parsed >= 1 && parsed <= MAX_PAGE ? parsed : 1;
}

function cleanFilter(value: string | null, maxLength: number) {
  return (value || '').trim().slice(0, maxLength);
}

export function TireCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = getPage(searchParams.get('page'));
  const size = cleanFilter(searchParams.get('size'), 32);
  const brand = cleanFilter(searchParams.get('brand'), 80);
  const [state, setState] = useState<CatalogState>({ status: 'loading', tires: [], pagination: null });

  const queryKey = `${page}|${size}|${brand}`;

  useEffect(() => {
    const controller = new AbortController();

    async function loadPage() {
      setState({ status: 'loading', tires: [], pagination: null });

      try {
        const response = await fetchTires({
          page,
          per_page: PAGE_SIZE,
          size: size || undefined,
          brand: brand || undefined,
          signal: controller.signal,
        });

        if (!response.success) {
          setState({ status: 'unavailable', tires: [], pagination: null });
          return;
        }

        setState({
          status: 'ready',
          tires: response.data.filter(isValidTire).map(mapTireRavenItemToTire),
          pagination: response.pagination,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        console.error('Catalog inventory request failed', error);
        setState({ status: 'unavailable', tires: [], pagination: null });
      }
    }

    void loadPage();
    return () => controller.abort();
  }, [page, size, brand]);

  const buildPageHref = (nextPage: number) => {
    const next = new URLSearchParams();
    if (size) next.set('size', size);
    if (brand) next.set('brand', brand);
    if (nextPage > 1) next.set('page', String(nextPage));
    return `${pathname}${next.size ? `?${next.toString()}` : ''}`;
  };

  const hasFilters = Boolean(size || brand);
  const canGoBack = page > 1;
  const nextPage = state.status === 'ready' ? state.pagination.next_page : null;
  const canGoForward = nextPage !== null && nextPage <= MAX_PAGE;

  const resultSummary = useMemo(() => {
    if (state.status !== 'ready') return '';
    const count = state.tires.length;
    return `${count} tire ${count === 1 ? 'listing' : 'listings'} on page ${page}`;
  }, [state, page]);

  function handleFilterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextSize = String(formData.get('size') || '').trim().slice(0, 32);
    const nextBrand = String(formData.get('brand') || '').trim().slice(0, 80);
    const next = new URLSearchParams();
    if (nextSize) next.set('size', nextSize);
    if (nextBrand) next.set('brand', nextBrand);
    router.push(`${pathname}${next.size ? `?${next.toString()}` : ''}`);
  }

  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="border-b bg-white py-10 sm:py-14">
        <div className="container">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-red-600">Current listings</p>
          <h1 className="text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">Tire inventory</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
            Search the connected inventory by exact tire size or brand, then ask the El Cajon team to confirm fit, pricing, and availability.
          </p>
        </div>
      </section>

      <div className="container py-8 sm:py-10">
        <form
          key={queryKey}
          onSubmit={handleFilterSubmit}
          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-5"
          aria-label="Filter tire inventory"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="catalog-size" className="font-bold text-zinc-900">Tire size</Label>
              <Input
                id="catalog-size"
                name="size"
                defaultValue={size}
                maxLength={32}
                placeholder="Example: 225/65R17"
                className="h-11 bg-white text-zinc-950 placeholder:text-zinc-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catalog-brand" className="font-bold text-zinc-900">Brand</Label>
              <Input
                id="catalog-brand"
                name="brand"
                defaultValue={brand}
                maxLength={80}
                placeholder="Example: Michelin"
                className="h-11 bg-white text-zinc-950 placeholder:text-zinc-500"
              />
            </div>
            <Button type="submit" className="h-11 bg-red-600 font-bold text-white hover:bg-red-700">
              <Search aria-hidden="true" />
              Search Inventory
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs leading-5 text-zinc-600">
            <p>Use the full size shown on the tire sidewall. Filters are sent to the connected inventory provider.</p>
            {hasFilters && (
              <Link href="/tires" className="inline-flex min-h-11 items-center font-bold text-red-700 hover:underline">
                Clear filters
              </Link>
            )}
          </div>
        </form>

        <div className="mt-7" aria-live="polite">
          {state.status === 'loading' && (
            <div>
              <p className="mb-4 text-sm font-medium text-zinc-600">Loading connected inventory…</p>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" role="status">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="h-96 animate-pulse rounded-xl border border-zinc-200 bg-white" />
                ))}
                <span className="sr-only">Loading tire listings</span>
              </div>
            </div>
          )}

          {state.status === 'unavailable' && (
            <div className="rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center shadow-sm">
              <h2 className="text-2xl font-black text-zinc-950">Online inventory is unavailable</h2>
              <p className="mx-auto mt-3 max-w-xl leading-7 text-zinc-600">
                The shop can still check current options for your vehicle. No inventory or pricing is being shown while the connection is unavailable.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild className="h-12 bg-red-600 font-bold text-white hover:bg-red-700">
                  <Link href="/#quote">Check Availability</Link>
                </Button>
                <Button asChild variant="outline" className="h-12 font-bold">
                  <a href="tel:619-440-6098">Call 619-440-6098</a>
                </Button>
              </div>
            </div>
          )}

          {state.status === 'ready' && (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-zinc-600">{resultSummary}</p>
                <p className="text-xs text-zinc-500">Availability and pricing must be confirmed with the shop.</p>
              </div>

              {state.tires.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {state.tires.map((tire) => (
                    <ProductCard
                      key={tire.id}
                      product={{
                        id: tire.id,
                        name: tire.name,
                        brand: tire.brand,
                        price: tire.price,
                        images: [tire.image],
                        category: 'tires',
                        inStock: tire.stock > 0,
                        rating: 0,
                        reviewCount: 0,
                        size: tire.size,
                        loadIndex: tire.loadIndex,
                        speedRating: tire.speedRating,
                        features: [],
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center shadow-sm">
                  <h2 className="text-2xl font-black text-zinc-950">No tire listings returned</h2>
                  <p className="mx-auto mt-3 max-w-xl leading-7 text-zinc-600">
                    {hasFilters
                      ? 'The connected inventory did not return tire listings for these filters. Try clearing them or ask the shop to check the size.'
                      : 'The connected inventory did not return tire listings on this page. Ask the shop to check current options.'}
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    {hasFilters && (
                      <Button asChild variant="outline" className="h-12 font-bold">
                        <Link href="/tires">Clear Filters</Link>
                      </Button>
                    )}
                    <Button asChild className="h-12 bg-red-600 font-bold text-white hover:bg-red-700">
                      <Link href="/#quote">Check Availability</Link>
                    </Button>
                  </div>
                </div>
              )}

              {(canGoBack || canGoForward) && (
                <nav className="mt-8 flex items-center justify-between gap-4" aria-label="Inventory pages">
                  {canGoBack ? (
                    <Button asChild variant="outline" className="h-11 font-bold">
                      <Link href={buildPageHref(page - 1)}>
                        <ArrowLeft aria-hidden="true" /> Previous
                      </Link>
                    </Button>
                  ) : <span />}
                  <span className="text-sm font-bold text-zinc-700">Page {page}</span>
                  {canGoForward ? (
                    <Button asChild variant="outline" className="h-11 font-bold">
                      <Link href={buildPageHref(nextPage!)}>
                        Next <ArrowRight aria-hidden="true" />
                      </Link>
                    </Button>
                  ) : <span />}
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
