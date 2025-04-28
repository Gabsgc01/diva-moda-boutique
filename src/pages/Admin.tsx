
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products, categories } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface ProductFormData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  inStock: boolean;
  images: string[];
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [productsList, setProductsList] = useState(products);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    sizes: [],
    colors: [],
    featured: false,
    inStock: true,
    images: ['', ''],
  });

  // All available sizes and colors for checkboxes
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', '40', '41'];
  const allColors = ['White', 'Black', 'Blue', 'Red', 'Green', 'Pink', 'Purple', 'Brown', 'Yellow', 'Gray', 'Tan', 'Light Blue', 'Dark Blue', 'Multicolor'];

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      price: 0,
      category: '',
      sizes: [],
      colors: [],
      featured: false,
      inStock: true,
      images: ['', ''],
    });
    setIsEditing(false);
  };

  const handleEditProduct = (product: typeof products[0]) => {
    setFormData({ ...product });
    setIsEditing(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProductsList(prev => prev.filter(product => product.id !== id));
      toast.success('Product deleted');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.description || formData.price <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.sizes.length === 0) {
      toast.error('Please select at least one size');
      return;
    }

    if (formData.colors.length === 0) {
      toast.error('Please select at least one color');
      return;
    }

    // In a real app, this would send the data to a server
    if (isEditing) {
      // Update existing product
      setProductsList(prev => 
        prev.map(product => 
          product.id === formData.id ? { ...formData } : product
        )
      );
      toast.success('Product updated');
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: String(Date.now()), // Generate a simple ID
      };
      setProductsList(prev => [...prev, newProduct]);
      toast.success('Product added');
    }

    resetForm();
  };

  const handleSizeToggle = (size: string) => {
    setFormData(prev => {
      if (prev.sizes.includes(size)) {
        return { ...prev, sizes: prev.sizes.filter(s => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size] };
      }
    });
  };

  const handleColorToggle = (color: string) => {
    setFormData(prev => {
      if (prev.colors.includes(color)) {
        return { ...prev, colors: prev.colors.filter(c => c !== color) };
      } else {
        return { ...prev, colors: [...prev.colors, color] };
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8 w-full md:w-1/2">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          
          {/* Products Tab */}
          <TabsContent value="products">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product Form */}
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</CardTitle>
                    <CardDescription>
                      {isEditing ? 'Update the product details' : 'Create a new product listing'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category || "select-category"}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="select-category" disabled>Select category</SelectItem>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.name.toLowerCase()}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Sizes</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {allSizes.map(size => (
                            <div key={size} className="flex items-center space-x-2">
                              <Checkbox
                                id={`size-${size}`}
                                checked={formData.sizes.includes(size)}
                                onCheckedChange={() => handleSizeToggle(size)}
                              />
                              <Label htmlFor={`size-${size}`}>{size}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Colors</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {allColors.map(color => (
                            <div key={color} className="flex items-center space-x-2">
                              <Checkbox
                                id={`color-${color}`}
                                checked={formData.colors.includes(color)}
                                onCheckedChange={() => handleColorToggle(color)}
                              />
                              <Label htmlFor={`color-${color}`}>{color}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Product Images</Label>
                        <div className="space-y-2">
                          <Input
                            placeholder="Image URL 1"
                            value={formData.images[0] || ''}
                            onChange={(e) => {
                              const newImages = [...formData.images];
                              newImages[0] = e.target.value;
                              setFormData({ ...formData, images: newImages });
                            }}
                          />
                          <Input
                            placeholder="Image URL 2"
                            value={formData.images[1] || ''}
                            onChange={(e) => {
                              const newImages = [...formData.images];
                              newImages[1] = e.target.value;
                              setFormData({ ...formData, images: newImages });
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, featured: checked === true })
                          }
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="inStock"
                          checked={formData.inStock}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, inStock: checked === true })
                          }
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button type="submit" className="flex-1">
                          {isEditing ? 'Update Product' : 'Add Product'}
                        </Button>
                        {isEditing && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={resetForm}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Products List */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Product List</CardTitle>
                    <CardDescription>
                      Manage your product inventory
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full table-auto">
                        <thead className="border-b">
                          <tr>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productsList.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50">
                              <td className="px-4 py-2">
                                <div className="w-12 h-12 rounded overflow-hidden">
                                  <img
                                    src={product.images[0] || '/assets/placeholder.svg'}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = '/assets/placeholder.svg';
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="px-4 py-2">{product.name}</td>
                              <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                              <td className="px-4 py-2 capitalize">{product.category}</td>
                              <td className="px-4 py-2">
                                {product.inStock ? (
                                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                    In Stock
                                  </span>
                                ) : (
                                  <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                    Out of Stock
                                  </span>
                                )}
                                {product.featured && (
                                  <span className="ml-1 inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                    Featured
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-2">
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditProduct(product)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteProduct(product.id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders Management</CardTitle>
                <CardDescription>
                  View and manage customer orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Orders management functionality will be implemented in the next phase.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  View and manage customer information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Customer management functionality will be implemented in the next phase.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
