'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { FilterSidebar } from '@/components/catalog/FilterSidebar';
import { wheels, wheelBrands, wheelSizes, wheelFinishes, wheelBoltPatterns } from '@/lib/data/wheels';
import { TypographyH1, TypographyP } from '@/components/ui/typography';

export default function WheelsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    brand: [],
    size: [],
    finish: [],
    boltPattern: [],
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const maxPrice = 500;

  // Filter configuration
  const filterGroups = [
    {
      title: 'Brand',
      key: 'brand',
      options: wheelBrands.map(brand => ({
        value: brand,
        label: brand,
        count: wheels.filter(w => w.brand === brand).length,
      })),
    },
    {
      title: 'Size',
      key: 'size',
      options: wheelSizes.map(size => ({
        value: size,
        label: size,
        count: wheels.filter(w => w.size === size).length,
      })),
    },
    {
      title: 'Finish',
      key: 'finish',
      options: wheelFinishes.map(finish => ({
        value: finish.value,
        label: finish.label,
        count: wheels.filter(w => w.finish === finish.value).length,
      })),
    },
    {
      title: 'Bolt Pattern',
      key: 'boltPattern',
      options: wheelBoltPatterns.map(pattern => ({
        value: pattern,
        label: pattern,
        count: wheels.filter(w => w.boltPattern === pattern).length,
      })),
    },
  ];

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = wheels;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        wheel =>
          wheel.name.toLowerCase().includes(query) ||
          wheel.brand.toLowerCase().includes(query) ||
          wheel.size.toLowerCase().includes(query)
      );
    }

    // Category filters
    Object.entries(selectedFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(wheel => values.includes((wheel as any)[key]));
      }
    });

    // Price filter
    filtered = filtered.filter(wheel => wheel.price >= priceRange[0] && wheel.price <= priceRange[1]);

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
    setSelectedFilters({ brand: [], size: [], finish: [], boltPattern: [] });
    setPriceRange([0, maxPrice]);
    setSearchQuery('');
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <TypographyH1>Shop Wheels</TypographyH1>
        <TypographyP className="text-zinc-600 mt-2">
          Upgrade your ride with premium wheels. Professional mounting and balancing included.
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
          <div className="mb-4 text-sm text-zinc-600">
            Showing {filteredProducts.length} of {wheels.length} wheels
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-600 mb-4">No wheels found matching your criteria.</p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(wheel => (
                <ProductCard
                  key={wheel.id}
                  product={{
                    id: wheel.id,
                    name: wheel.name,
                    brand: wheel.brand,
                    price: wheel.price,
                    salePrice: wheel.originalPrice ? wheel.price : undefined,
                    images: [wheel.image],
                    category: 'wheels',
                    inStock: wheel.stock > 0,
                    rating: wheel.rating,
                    reviewCount: wheel.reviewCount,
                    size: wheel.size,
                    boltPattern: wheel.boltPattern,
                    offset: wheel.offset,
                    features: wheel.features,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
