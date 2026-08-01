// TireRaven API Integration
// API Documentation: https://api.tireraven.com

// TireRaven API Response Types
export interface TireRavenBrand {
  id: number;
  name: string;
}

export interface TireRavenItem {
  id: number;
  ean_code: string;
  nav: string; // Full product name
  size: string; // Tire size (e.g., "225/65R17")
  pattern: string; // Pattern/model name
  available: boolean;
  stock_quantity: number;
  price: string; // Retail price (customer-facing)
  type: string | null;
  brand: TireRavenBrand;
}

export interface TireRavenPagination {
  current_page: number;
  total_pages: number;
  total_count: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
}

export interface TireRavenResponse {
  success: boolean;
  data: TireRavenItem[];
  pagination: TireRavenPagination;
}

// Our internal Tire type mapping
export interface Tire {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  size: string;
  type: 'all-season' | 'summer' | 'winter' | 'all-terrain' | 'mud-terrain' | 'performance';
  loadIndex: string;
  speedRating: string;
  stock: number;
  features: string[];
  eanCode?: string;
  pattern?: string;
}

/**
 * Fetch customer-safe inventory from the same-origin server boundary.
 */
export async function fetchTires(params?: {
  page?: number;
  per_page?: number;
  size?: string;
  brand?: string;
  signal?: AbortSignal;
}): Promise<TireRavenResponse> {
  const searchParams = new URLSearchParams();

  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
  if (params?.size) searchParams.append('size', params.size);
  if (params?.brand) searchParams.append('brand', params.brand);

  const url = `/api/inventory${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal: params?.signal,
  });

  if (!response.ok) {
    throw new Error(`Inventory service error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Map TireRaven item to our internal Tire type
 */
export function mapTireRavenItemToTire(item: TireRavenItem): Tire {
  // Parse load index and speed rating from pattern or nav
  const loadSpeedMatch = item.pattern?.match(/(\d{2,3})([A-Z])/);
  const loadIndex = loadSpeedMatch?.[1] || '—';
  const speedRating = loadSpeedMatch?.[2] || '—';

  // Determine tire type based on pattern keywords
  let type: Tire['type'] = 'all-season'; // default
  const patternLower = (item.pattern || '').toLowerCase();
  const navLower = (item.nav || '').toLowerCase();

  if (patternLower.includes('winter') || patternLower.includes('blizzak') || navLower.includes('winter')) {
    type = 'winter';
  } else if (patternLower.includes('a/t') || patternLower.includes('all-terrain') || patternLower.includes('4x4')) {
    type = 'all-terrain';
  } else if (patternLower.includes('m/t') || patternLower.includes('mud') || patternLower.includes('ridgecrawler')) {
    type = 'mud-terrain';
  } else if (patternLower.includes('sport') || patternLower.includes('performance') || patternLower.includes('pilot')) {
    type = 'performance';
  } else if (patternLower.includes('summer') || patternLower.includes('toprun')) {
    type = 'summer';
  }

  // Keep display features limited to descriptive data. Inventory status is
  // intentionally confirmed through the shop rather than converted to claims.
  const features: string[] = [];
  if (loadIndex !== '—') {
    features.push(`Load Index: ${loadIndex}`);
  }

  // price field is the retail price (customer-facing)
  const parsedPrice = parseFloat(item.price || '0');
  const retailPrice = Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : 0;

  return {
    id: `tireraven-${item.id}`,
    name: item.pattern || item.nav || 'Unknown Product',
    brand: item.brand?.name || 'Unknown Brand',
    image: '/placeholder-tire.jpg', // TODO: Add tire images
    price: retailPrice, // Retail price for customers ($62 not $37)
    rating: 0, // Only show ratings when a verified source is connected
    reviewCount: 0,
    size: item.size || 'UNKNOWN',
    type,
    loadIndex,
    speedRating,
    stock: item.stock_quantity || 0,
    features,
    eanCode: item.ean_code,
    pattern: item.pattern,
  };
}

/**
 * Check if an item is a valid tire (not accessories like valve stems)
 */
export function isValidTire(item: TireRavenItem): boolean {
  // Filter out non-tire items
  if (!item.size || item.size === 'UNKNOWN') return false;
  if (!item.brand || !item.brand.name) return false;
  if (!item.pattern && !item.nav) return false;

  // Check if it looks like a tire size (has pattern like 225/65R17 or LT265/70R17)
  const tirePattern = /^(P|LT)?\d{3}\/\d{2}R\d{2}$/i;
  return tirePattern.test(item.size);
}

/**
 * Get all tires with pagination support
 */
export async function getAllTires(maxPages: number = 10): Promise<Tire[]> {
  const allTires: Tire[] = [];
  let currentPage = 1;
  let totalPages = 1;

  try {
    do {
      const response = await fetchTires({ page: currentPage, per_page: 50 });

      if (!response.success || !response.data) {
        console.error('Failed to fetch tires from TireRaven API');
        break;
      }

      // Filter out non-tire items and map to internal format
      const validItems = response.data.filter(isValidTire);
      const mappedTires = validItems.map(mapTireRavenItemToTire);
      allTires.push(...mappedTires);

      totalPages = response.pagination.total_pages;
      currentPage++;
    } while (currentPage <= totalPages && currentPage <= maxPages);

    return allTires;
  } catch (error) {
    console.error('Error fetching tires from TireRaven:', error);
    // Return empty array on error - component will handle fallback
    return [];
  }
}

/**
 * Get tires filtered by size
 */
export async function getTiresBySize(size: string): Promise<Tire[]> {
  try {
    const response = await fetchTires({ size, per_page: 50 });

    if (!response.success || !response.data) {
      return [];
    }

    const validItems = response.data.filter(isValidTire);
    return validItems.map(mapTireRavenItemToTire);
  } catch (error) {
    console.error(`Error fetching tires for size ${size}:`, error);
    return [];
  }
}

/**
 * Get unique brands from TireRaven data
 */
export async function getTireBrands(): Promise<string[]> {
  try {
    const response = await fetchTires({ per_page: 50 });

    if (!response.success || !response.data) {
      return [];
    }

    const validItems = response.data.filter(isValidTire);
    const brands = Array.from(new Set(validItems.map(item => item.brand.name)));
    return brands.sort();
  } catch (error) {
    console.error('Error fetching tire brands:', error);
    return [];
  }
}

/**
 * Get unique tire sizes from TireRaven data
 */
export async function getTireSizes(): Promise<string[]> {
  try {
    const response = await fetchTires({ per_page: 50 });

    if (!response.success || !response.data) {
      return [];
    }

    const sizes = Array.from(new Set(response.data.map(item => item.size).filter(size => size !== 'UNKNOWN')));
    return sizes.sort();
  } catch (error) {
    console.error('Error fetching tire sizes:', error);
    return [];
  }
}
