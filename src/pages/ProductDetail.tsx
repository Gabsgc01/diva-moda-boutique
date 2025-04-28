
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<number>(0);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for does not exist.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors">
                Products
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link 
                to={`/products?category=${product.category}`} 
                className="hover:text-primary transition-colors"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="font-medium text-gray-900">{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images[currentImage] || '/assets/placeholder.svg'}
                alt={product.name}
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/assets/placeholder.svg';
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`aspect-square rounded-md bg-gray-100 overflow-hidden ${
                    currentImage === index ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <img
                    src={image || '/assets/placeholder.svg'}
                    alt={`${product.name} - view ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/assets/placeholder.svg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-primary mb-4">
              ${product.price.toFixed(2)}
            </p>
            
            <div className="prose max-w-none mb-8">
              <p>{product.description}</p>
            </div>
            
            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-2">Size</h3>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-2">Color</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={color}
                        id={`color-${color}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex items-center justify-center rounded-md border-2 border-gray-200 px-3 py-2 cursor-pointer peer-data-[state=checked]:border-primary"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-l border border-r-0 border-gray-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center border-y border-gray-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded-r border border-l-0 border-gray-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
              >
                Add to Wishlist
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="border-t border-gray-200 mt-8 pt-6 space-y-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 w-24">SKU:</span>
                <span className="text-sm">SKU-{product.id}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 w-24">Category:</span>
                <span className="text-sm capitalize">{product.category}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 w-24">Tags:</span>
                <span className="text-sm">Fashion, Women, {product.category}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
