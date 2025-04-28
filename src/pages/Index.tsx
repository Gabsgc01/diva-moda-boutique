
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { categories, getFeaturedProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-100 h-[70vh] flex items-center">
          <div className="absolute inset-0 bg-fashion-black/20"></div>
          <div className="container mx-auto px-4 z-10 text-center md:text-left">
            <div className="max-w-md md:max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Discover Your Style
              </h1>
              <p className="text-lg text-white mb-8">
                Explore our latest collection of women's fashion designed for comfort and elegance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/products">Shop Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white">
                  <Link to="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Promotion Banner */}
        <section className="py-16 container mx-auto px-4">
          <div className="bg-secondary rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Summer Sale</h2>
              <p className="text-lg mb-6">
                Get up to 50% off on our summer collection. Limited time offer!
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/products?sale=true">Shop Sale</Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/assets/placeholder.svg"
                alt="Summer Sale"
                className="rounded-lg max-h-64 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for exclusive offers and style updates
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
