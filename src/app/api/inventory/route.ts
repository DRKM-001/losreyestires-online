import { NextRequest, NextResponse } from 'next/server';
import {
  fetchInventoryFromTireRaven,
  InventoryConfigurationError,
  InventoryUpstreamError,
} from '@/lib/api/tireraven-server';

export const runtime = 'edge';

function parseInteger(value: string | null, fallback: number, min: number, max: number): number | null {
  if (value === null) return fallback;
  if (!/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return parsed >= min && parsed <= max ? parsed : null;
}

function parseFilter(value: string | null, maxLength: number): string | null {
  if (value === null) return '';
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength || /[\u0000-\u001f\u007f]/.test(trimmed)) return null;
  return trimmed;
}

export async function GET(request: NextRequest) {
  const page = parseInteger(request.nextUrl.searchParams.get('page'), 1, 1, 100);
  const perPage = parseInteger(request.nextUrl.searchParams.get('per_page'), 50, 1, 50);
  const size = parseFilter(request.nextUrl.searchParams.get('size'), 32);
  const brand = parseFilter(request.nextUrl.searchParams.get('brand'), 80);

  if (page === null || perPage === null || size === null || brand === null) {
    return NextResponse.json({ error: 'Invalid inventory query' }, { status: 400 });
  }

  const upstreamParams = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });
  if (size) upstreamParams.set('size', size);
  if (brand) upstreamParams.set('brand', brand);

  try {
    const inventory = await fetchInventoryFromTireRaven(upstreamParams);
    return NextResponse.json(inventory, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
    });
  } catch (error) {
    if (error instanceof InventoryConfigurationError) {
      console.error('Inventory route unavailable: server credentials are not configured');
      return NextResponse.json({ error: 'Inventory is temporarily unavailable' }, { status: 503 });
    }
    if (error instanceof InventoryUpstreamError) {
      console.error(`Inventory provider failed with status ${error.status}`);
      return NextResponse.json({ error: 'Inventory provider is temporarily unavailable' }, { status: 502 });
    }
    console.error('Unexpected inventory route failure', error);
    return NextResponse.json({ error: 'Inventory is temporarily unavailable' }, { status: 500 });
  }
}
