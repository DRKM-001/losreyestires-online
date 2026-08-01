import 'server-only';

import type { TireRavenItem, TireRavenPagination, TireRavenResponse } from './tireraven';

const DEFAULT_API_BASE = 'https://api.tireraven.com/api/external/v1';

interface UpstreamResponse {
  success?: unknown;
  data?: unknown;
  pagination?: unknown;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asNumber(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function sanitizeItem(value: unknown): TireRavenItem | null {
  const item = asRecord(value);
  const brand = asRecord(item?.brand);

  if (!item || !brand) return null;

  const id = asNumber(item.id);
  const brandName = asString(brand.name);
  if (!id || !brandName) return null;

  return {
    id,
    ean_code: asString(item.ean_code),
    nav: asString(item.nav),
    size: asString(item.size),
    pattern: asString(item.pattern),
    available: item.available === true,
    stock_quantity: Math.max(0, asNumber(item.stock_quantity)),
    price: asString(item.price),
    type: typeof item.type === 'string' ? item.type : null,
    brand: {
      id: asNumber(brand.id),
      name: brandName,
    },
  };
}

function sanitizePagination(value: unknown): TireRavenPagination {
  const pagination = asRecord(value);
  const nullableNumber = (entry: unknown) => typeof entry === 'number' && Number.isFinite(entry) ? entry : null;

  return {
    current_page: Math.max(1, asNumber(pagination?.current_page)),
    total_pages: Math.max(1, asNumber(pagination?.total_pages)),
    total_count: Math.max(0, asNumber(pagination?.total_count)),
    per_page: Math.max(1, asNumber(pagination?.per_page)),
    next_page: nullableNumber(pagination?.next_page),
    prev_page: nullableNumber(pagination?.prev_page),
  };
}

export class InventoryConfigurationError extends Error {}
export class InventoryUpstreamError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function fetchInventoryFromTireRaven(searchParams: URLSearchParams): Promise<TireRavenResponse> {
  const apiKey = process.env.TIRERAVEN_API_KEY;
  const apiBase = (process.env.TIRERAVEN_API_BASE || DEFAULT_API_BASE).replace(/\/$/, '');

  if (!apiKey) {
    throw new InventoryConfigurationError('TIRERAVEN_API_KEY is not configured');
  }

  const response = await fetch(`${apiBase}/items?${searchParams.toString()}`, {
    headers: {
      Accept: 'application/json',
      'X-API-Key': apiKey,
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new InventoryUpstreamError('Inventory provider request failed', response.status);
  }

  const upstream = await response.json() as UpstreamResponse;
  const items = Array.isArray(upstream.data)
    ? upstream.data.map(sanitizeItem).filter((item): item is TireRavenItem => item !== null)
    : [];

  return {
    success: upstream.success === true,
    data: items,
    pagination: sanitizePagination(upstream.pagination),
  };
}
