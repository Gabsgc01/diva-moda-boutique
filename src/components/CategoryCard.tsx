
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.name.toLowerCase()}`}
      className="block group relative overflow-hidden rounded-lg"
    >
      <div className="h-64 bg-gray-100">
        <img
          src={category.image || '/assets/placeholder.svg'}
          alt={category.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/assets/placeholder.svg';
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-30">
        <h3 className="text-2xl font-semibold text-white">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
