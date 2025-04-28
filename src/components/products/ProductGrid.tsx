
import React from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  products: Product[];
  onClearFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onClearFilters }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        <Button variant="link" onClick={onClearFilters}>
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
