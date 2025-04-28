
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface ProductsHeaderProps {
  searchQuery?: string;
  selectedCategory?: string;
  totalProducts: number;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({
  searchQuery,
  selectedCategory,
  totalProducts,
  sortBy,
  onSortChange,
}) => {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        {searchQuery && (
          <p className="mt-2 text-gray-600">
            Search results for: "{searchQuery}"
          </p>
        )}
        {selectedCategory && selectedCategory !== 'all' && (
          <p className="mt-2 text-gray-600">
            Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
        </p>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default ProductsHeader;
