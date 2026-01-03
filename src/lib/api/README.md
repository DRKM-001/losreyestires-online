# TireRaven API Integration

This directory contains the integration with the TireRaven ERP API for real-time tire inventory data.

## Overview

The Los Reyes Tires online shop now fetches real-time tire inventory from the TireRaven API instead of using static mock data. This ensures customers see accurate pricing, availability, and product information.

## API Details

- **Base URL**: `https://api.tireraven.com/api/external/v1`
- **Authentication**: API Key via `X-API-Key` header
- **Tenant**: `los-reyes-tires`
- **Rate Limiting**: 5-minute cache for API responses
- **Current Inventory**: 10 items (as of integration date)

## Files

### `tireraven.ts`
Main API client with:
- TypeScript interfaces for API responses
- Functions to fetch tire data
- Mapping logic from TireRaven format to internal Tire type
- Error handling with fallback to mock data

## Key Functions

### `fetchTires(params?)`
Low-level fetch function with filtering support:
- `page`: Page number for pagination
- `per_page`: Items per page (max 50)
- `size`: Filter by tire size (e.g., "225/65R17")
- `brand`: Filter by brand name

### `getAllTires(maxPages?)`
Fetches all tires across multiple pages (default: 10 pages max)

### `getTiresBySize(size)`
Fetches tires for a specific size - used by the tire finder

### `getTireBrands()` / `getTireSizes()`
Helper functions to get unique brands and sizes for filter options

### `mapTireRavenItemToTire(item)`
Maps TireRaven API format to internal Tire type with:
- Type detection (all-season, winter, A/T, M/T, performance, summer)
- Load index and speed rating parsing
- Stock and availability mapping
- Feature generation

## Data Mapping

### TireRaven → Internal Format

| TireRaven Field | Internal Field | Notes |
|-----------------|----------------|-------|
| `id` | `id` | Prefixed with "tireraven-" |
| `pattern` | `name` | Product name |
| `brand.name` | `brand` | Brand name |
| `price` | `price` | Converted to number |
| `size` | `size` | Tire size (e.g., "225/65R17") |
| `stock_quantity` | `stock` | Available quantity |
| `available` | Features | Mapped to feature text |
| `ean_code` | `eanCode` | EAN/UPC code |

### Type Detection Logic

Pattern keywords determine tire type:
- **Winter**: "winter", "blizzak"
- **All-Terrain**: "a/t", "all-terrain", "4x4"
- **Mud-Terrain**: "m/t", "mud", "ridgecrawler"
- **Performance**: "sport", "performance", "pilot"
- **Summer**: "summer", "toprun"
- **All-Season**: Default fallback

## Usage in Components

### Tires Page (`/app/tires/page.tsx`)
- Fetches all tires on component mount via `useEffect`
- Falls back to mock data if API fails
- Shows loading spinner during fetch
- Dynamically populates brand/size filters from API data

### Tire Finder (`/components/home/HeroSection.tsx`)
- Uses vehicle fitment data to determine tire size
- Can be extended to query API by size in real-time
- Currently navigates to tires page with size filter

## Environment Variables

```bash
# .env.local (not committed to git)
NEXT_PUBLIC_TIRERAVEN_API_KEY=tireraven_live_...
```

⚠️ **Important**: The API key is required and should be kept secure. For static builds (Cloudflare Pages), the key is embedded at build time.

## Caching Strategy

Since the site uses static export for Cloudflare Pages:
- API calls happen at **build time** for static generation
- Client-side calls happen on **page load** for dynamic updates
- 5-minute cache (`revalidate: 300`) reduces API load
- Fallback data ensures site works even if API is down

## Testing

Run the test script to verify API connectivity:
```bash
node test-api.js
```

This will show:
- API connection status
- Total inventory count
- Sample tire data
- Pricing and availability

## Future Enhancements

1. **Real-time Stock Updates**: WebSocket or polling for live stock changes
2. **Tire Images**: Add image URLs from TireRaven or external sources
3. **Reviews Integration**: Fetch customer reviews if available
4. **Advanced Filtering**: More filter options (load range, ply rating, etc.)
5. **Search API**: Use TireRaven's search endpoint for better results
6. **Wheels API**: Integrate wheel inventory when available
7. **Order Integration**: Connect checkout to TireRaven order system

## Error Handling

The integration includes robust error handling:
- Network errors fall back to mock data
- Empty responses use fallback data
- Console logging for debugging
- User sees loading state during fetch
- No error messages shown to user (graceful degradation)

## Support

For TireRaven API issues or questions:
- API Documentation: [TireRaven API Docs]
- Tenant: los-reyes-tires
- Contact: Los Reyes Tires technical support
