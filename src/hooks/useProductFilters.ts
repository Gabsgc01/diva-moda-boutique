
import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface UseProductFiltersProps {
  products: Product[];
  initialCategory?: string;
  initialSearch?: string;
}

interface UseProductFiltersReturn {
  filteredProducts: Product[];
  selectedCategory: string;
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: [number, number];
  sortBy: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSelectedSizes: (sizes: string[]) => void;
  setSelectedColors: (colors: string[]) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: string) => void;
  setSearchQuery: (query: string) => void;
  handleSizeToggle: (size: string) => void;
  handleColorToggle: (color: string) => void;
  handleClearFilters: () => void;
}

export const useProductFilters = ({
  products,
  initialCategory = '',
  initialSearch = '',
}: UseProductFiltersProps): UseProductFiltersReturn => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => {
      if (prev.includes(size)) {
        return prev.filter(s => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    setSortBy('featured');
    setSearchQuery('');
  };

  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory.toLowerCase());
    }
    
    if (selectedSizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    if (selectedColors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, searchQuery, products]);

  return {
    filteredProducts,
    selectedCategory,
    selectedSizes,
    selectedColors,
    priceRange,
    sortBy,
    searchQuery,
    setSelectedCategory,
    setSelectedSizes,
    setSelectedColors,
    setPriceRange,
    setSortBy,
    setSearchQuery,
    handleSizeToggle,
    handleColorToggle,
    handleClearFilters,
  };
};
