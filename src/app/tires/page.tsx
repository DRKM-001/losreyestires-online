'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Metadata } from 'next';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { tires as fallbackTires, tireTypes } from '@/lib/data/tires';
import { getAllTires, getTireBrands, getTireSizes, type Tire } from '@/lib/api/tireraven';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { trackViewItemList } from '@/lib/analytics/ga4';

export default function TiresPage() {
  const [tires, setTires] = useState<Tire[]>(fallbackTires);
  const [tireBrands, setTireBrands] = useState<string[]>([]);
  const [tireSizes, setTireSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    brand: [],
    size: [],
    type: [],
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);

  const maxPrice = 400;

  // Fetch tires from TireRaven API on component mount
  useEffect(() => {
    async function loadTires() {
      try {
        setLoading(true);
        const [apiTires, brands, sizes] = await Promise.all([
          getAllTires(10), // Fetch up to 10 pages
          getTireBrands(),
          getTireSizes(),
        ]);
        
        if (apiTires.length > 0) {
          setTires(apiTires);
          setTireBrands(brands);
          setTireSizes(sizes);
          console.log(`Loaded ${apiTires.length} tires from TireRaven API`);
        } else {
          console.log('Using fallback tire data');
          // Keep fallback data if API fails
          const brands = Array.from(new Set(fallbackTires.map(t => t.brand))).sort();
          const sizes = Array.from(new Set(fallbackTires.map(t => t.size))).sort();
          setTireBrands(brands);
          setTireSizes(sizes);
        }
      } catch (error) {
        console.error('Error loading tires:', error);
        // Use fallback data on error
        const brands = Array.from(new Set(fallbackTires.map(t => t.brand))).sort();
        const sizes = Array.from(new Set(fallbackTires.map(t => t.size))).sort();
        setTireBrands(brands);
        setTireSizes(sizes);
      } finally {
        setLoading(false);
      }
    }

    loadTires();
  }, []);

  // Filter configuration
  const filterGroups = [
    {
      title: 'Brand',
      key: 'brand',
      options: tireBrands.map(brand => ({
        value: brand,
        label: brand,
        count: tires.filter(t => t.brand === brand).length,
      })),
    },
    {
      title: 'Size',
      key: 'size',
      options: tireSizes.map(size => ({
        value: size,
        label: size,
        count: tires.filter(t => t.size === size).length,
      })),
    },
    {
      title: 'Type',
      key: 'type',
      options: tireTypes.map(type => ({
        value: type.value,
        label: type.label,
        count: tires.filter(t => t.type === type.value).length,
      })),
    },
  ];

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = tires;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        tire =>
          tire.name.toLowerCase().includes(query) ||
          tire.brand.toLowerCase().includes(query) ||
          tire.size.toLowerCase().includes(query)
      );
    }

    // Category filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(tire => values.includes((tire as any)[key]));
      }
    });

    // Price filter
    filtered = filtered.filter(tire => tire.price >= priceRange[0] && tire.price <= priceRange[1]);

    // Sort
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, selectedFilters, priceRange, sortBy]);

  // Track product list views in GA4
  useEffect(() => {
    if (filteredProducts.length > 0 && !loading) {
      // Determine list name based on filters
      let listName = 'All Tires';
      if (searchQuery) {
        listName = `Search: ${searchQuery}`;
      } else if (selectedFilters.type?.length > 0) {
        listName = `${selectedFilters.type[0]} Tires`;
      }
      
      // Track up to 20 items to avoid huge payloads
      const itemsToTrack = filteredProducts.slice(0, 20).map(tire => ({
        item_id: tire.id,
        item_name: tire.name,
        item_brand: tire.brand,
        item_category: 'Tires',
        item_category2: tire.type,
        item_variant: 'New',
        price: tire.price,
      }));
      
      trackViewItemList(itemsToTrack, listName);
    }
  }, [filteredProducts, loading, searchQuery, selectedFilters.type]);

  const handleFilterChange = (key: string, value: string) => {
    setSelectedFilters(prev => {
      const current = prev[key] || [];
      const newValues = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({ brand: [], size: [], type: [] });
    setPriceRange([0, maxPrice]);
    setSearchQuery('');
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <TypographyH1>Shop Tires</TypographyH1>
        <TypographyP className="text-zinc-600 mt-2">
          Find the perfect tires for your vehicle. Free installation with purchase.
        </TypographyP>
      </div>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            type="search"
            placeholder="Search by brand, size, or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <div className="mt-6">
                <FilterSidebar
                  filters={filterGroups}
                  selectedFilters={selectedFilters}
                  priceRange={priceRange}
                  maxPrice={maxPrice}
                  onFilterChange={handleFilterChange}
                  onPriceChange={setPriceRange}
                  onClearAll={handleClearFilters}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar
              filters={filterGroups}
              selectedFilters={selectedFilters}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onFilterChange={handleFilterChange}
              onPriceChange={setPriceRange}
              onClearAll={handleClearFilters}
            />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-4 text-zinc-600">Loading tires from inventory...</p>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-zinc-600">
                Showing {filteredProducts.length} of {tires.length} tires
              </div>

              {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 mb-4">No tires found matching your criteria.</p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((tire, index) => (
                <ProductCard
                  key={tire.id}
                  product={{
                    id: tire.id,
                    name: tire.name,
                    brand: tire.brand,
                    price: tire.price,
                    salePrice: tire.originalPrice ? tire.price : undefined,
                    images: [tire.image],
                    category: 'tires',
                    inStock: tire.stock > 0,
                    rating: tire.rating,
                    reviewCount: tire.reviewCount,
                    size: tire.size,
                    loadIndex: tire.loadIndex,
                    speedRating: tire.speedRating,
                    features: tire.features,
                  }}
                  listName={searchQuery ? `Search: ${searchQuery}` : (selectedFilters.type?.length > 0 ? `${selectedFilters.type[0]} Tires` : 'All Tires')}
                  index={index}
                />
              ))}
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
