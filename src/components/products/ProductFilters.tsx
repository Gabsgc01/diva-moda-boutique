
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Filter } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  allSizes: string[];
  allColors: string[];
  selectedCategory: string;
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: [number, number];
  onCategoryChange: (value: string) => void;
  onSizeToggle: (size: string) => void;
  onColorToggle: (color: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  allSizes,
  allColors,
  selectedCategory,
  selectedSizes,
  selectedColors,
  priceRange,
  onCategoryChange,
  onSizeToggle,
  onColorToggle,
  onPriceRangeChange,
  onClearFilters,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Category</h3>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem 
                key={category} 
                value={category}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            defaultValue={[0, 200]}
            max={200}
            step={5}
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Size</h3>
        <div className="space-y-2">
          {allSizes.map(size => (
            <div key={size} className="flex items-center">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => onSizeToggle(size)}
              />
              <label
                htmlFor={`size-${size}`}
                className="ml-2 text-sm font-medium leading-none cursor-pointer"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Color</h3>
        <div className="space-y-2">
          {allColors.map(color => (
            <div key={color} className="flex items-center">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={() => onColorToggle(color)}
              />
              <label
                htmlFor={`color-${color}`}
                className="ml-2 text-sm font-medium leading-none cursor-pointer"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
