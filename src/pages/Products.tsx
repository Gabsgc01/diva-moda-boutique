
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductFilters from '@/components/products/ProductFilters';
import ProductsHeader from '@/components/products/ProductsHeader';
import ProductGrid from '@/components/products/ProductGrid';
import { useProductFilters } from '@/hooks/useProductFilters';

const Products = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || '';
  const searchParam = queryParams.get('search') || '';
  
  // Get all available sizes and colors
  const allSizes = Array.from(new Set(products.flatMap(product => product.sizes)));
  const allColors = Array.from(new Set(products.flatMap(product => product.colors)));
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  const {
    filteredProducts,
    selectedCategory,
    selectedSizes,
    selectedColors,
    priceRange,
    sortBy,
    searchQuery,
    setSelectedCategory,
    setSortBy,
    handleSizeToggle,
    handleColorToggle,
    handleClearFilters,
    setPriceRange,
  } = useProductFilters({
    products,
    initialCategory: categoryParam,
    initialSearch: searchParam,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ProductsHeader
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          totalProducts={filteredProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <ProductFilters
              categories={categories}
              allSizes={allSizes}
              allColors={allColors}
              selectedCategory={selectedCategory}
              selectedSizes={selectedSizes}
              selectedColors={selectedColors}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onSizeToggle={handleSizeToggle}
              onColorToggle={handleColorToggle}
              onPriceRangeChange={setPriceRange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <ProductGrid
              products={filteredProducts}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
