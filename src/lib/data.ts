
import { Product, Category } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Elegant Summer Dress",
    description: "A beautiful floral summer dress perfect for any occasion. Made with lightweight fabric for maximum comfort.",
    price: 89.99,
    images: ["/assets/dress1.jpg", "/assets/dress1-2.jpg"],
    category: "dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Pink", "Blue"],
    featured: true,
    inStock: true,
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    description: "A timeless denim jacket that goes with everything. Perfect for layering in any season.",
    price: 129.99,
    images: ["/assets/jacket1.jpg", "/assets/jacket1-2.jpg"],
    category: "jackets",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Light Blue", "Black"],
    featured: true,
    inStock: true,
  },
  {
    id: "3",
    name: "Slim Fit Jeans",
    description: "High-quality denim jeans with a modern slim fit. Comfortable stretch fabric for all-day wear.",
    price: 69.99,
    images: ["/assets/jeans1.jpg", "/assets/jeans1-2.jpg"],
    category: "pants",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    featured: true,
    inStock: true,
  },
  {
    id: "4",
    name: "Bohemian Maxi Skirt",
    description: "A flowing bohemian-style maxi skirt with vibrant patterns. Perfect for summer days and beach outings.",
    price: 59.99,
    images: ["/assets/skirt1.jpg", "/assets/skirt1-2.jpg"],
    category: "skirts",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Multicolor", "Red", "Blue"],
    featured: false,
    inStock: true,
  },
  {
    id: "5",
    name: "Cotton Blouse",
    description: "A lightweight cotton blouse with elegant details. Perfect for office wear or casual outings.",
    price: 49.99,
    images: ["/assets/blouse1.jpg", "/assets/blouse1-2.jpg"],
    category: "tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Pink"],
    featured: true,
    inStock: true,
  },
  {
    id: "6",
    name: "Leather Ankle Boots",
    description: "Stylish leather ankle boots with a comfortable heel. Perfect for any season.",
    price: 149.99,
    images: ["/assets/boots1.jpg", "/assets/boots1-2.jpg"],
    category: "shoes",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Black", "Brown", "Tan"],
    featured: false,
    inStock: true,
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Dresses",
    image: "/assets/category-dresses.jpg",
  },
  {
    id: "2",
    name: "Tops",
    image: "/assets/category-tops.jpg",
  },
  {
    id: "3",
    name: "Pants",
    image: "/assets/category-pants.jpg",
  },
  {
    id: "4",
    name: "Skirts",
    image: "/assets/category-skirts.jpg",
  },
  {
    id: "5",
    name: "Jackets",
    image: "/assets/category-jackets.jpg",
  },
  {
    id: "6",
    name: "Shoes",
    image: "/assets/category-shoes.jpg",
  },
];

// Function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category.toLowerCase());
};

// Function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
