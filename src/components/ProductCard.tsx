
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:opacity-90">
          <img
            src={product.images[0] || '/assets/placeholder.svg'}
            alt={product.name}
            className="h-80 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/placeholder.svg';
            }}
          />
        </div>
        <div className="mt-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          </div>
          <p className="text-lg font-medium text-primary">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      {!product.inStock && (
        <div className="mt-2">
          <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
