'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  title: string;
  key: string;
  options: FilterOption[];
}

interface FilterSidebarProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  priceRange: [number, number];
  maxPrice: number;
  onFilterChange: (key: string, value: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

export function FilterSidebar({
  filters,
  selectedFilters,
  priceRange,
  maxPrice,
  onFilterChange,
  onPriceChange,
  onClearAll,
}: FilterSidebarProps) {
  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0) || priceRange[1] < maxPrice;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="font-semibold">Price Range</Label>
        <div className="pt-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceChange(value as [number, number])}
            max={maxPrice}
            step={10}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-zinc-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Filter Groups */}
      {filters.map((group) => (
        <div key={group.key} className="space-y-3 border-t pt-6">
          <Label className="font-semibold">{group.title}</Label>
          <div className="space-y-2.5">
            {group.options.map((option) => {
              const isChecked = selectedFilters[group.key]?.includes(option.value) || false;
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${group.key}-${option.value}`}
                    checked={isChecked}
                    onCheckedChange={() => onFilterChange(group.key, option.value)}
                  />
                  <label
                    htmlFor={`${group.key}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {option.label}
                    {option.count !== undefined && (
                      <span className="text-zinc-500 ml-1">({option.count})</span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
