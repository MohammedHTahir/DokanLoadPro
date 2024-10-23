import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Zap, Sparkles } from 'lucide-react';
import { categories, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/components/ui/use-toast";

const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const featuredProducts = products.filter(p => p.featured);
  // Get the latest 3 products (in a real app, you'd sort by date)
  const newProducts = products.slice(0, 3);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Dokan Load</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Your one-stop marketplace for premium digital downloads. Discover, download, and create.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
            <Link to="/products">Start Exploring</Link>
          </Button>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 flex items-center">
          <Sparkles className="w-8 h-8 mr-2 text-yellow-500" />
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newProducts.map((product) => {
            const CategoryIcon = categories.find(c => c.id === product.category)?.icon;
            return (
              <Card key={product.id} className="flex flex-col">
                <CardHeader>
                  <div className="h-48 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    <span>{product.name}</span>
                    {CategoryIcon && <CategoryIcon className="w-5 h-5 text-gray-500" />}
                  </CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    By {product.author} • {product.sales} sales
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link to={`/product/${product.id}`}>View Details</Link>
                  </Button>
                  <Button onClick={() => handleAddToCart(product)}>
                    <Download className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-shadow">
                <Link to={`/products?category=${category.id}`}>
                  <CardHeader className="text-center">
                    <Icon className="w-8 h-8 mx-auto mb-2 group-hover:text-blue-600 transition-colors" />
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-center">
                      {category.description}
                    </CardDescription>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Zap className="w-8 h-8 mr-2 text-yellow-500" />
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const CategoryIcon = categories.find(c => c.id === product.category)?.icon;
              return (
                <Card key={product.id} className="flex flex-col">
                  <CardHeader>
                    <div className="h-48 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardTitle className="flex items-center justify-between">
                      <span>{product.name}</span>
                      {CategoryIcon && <CategoryIcon className="w-5 h-5 text-gray-500" />}
                    </CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      By {product.author} • {product.sales} sales
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link to={`/product/${product.id}`}>View Details</Link>
                    </Button>
                    <Button onClick={() => handleAddToCart(product)}>
                      <Download className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Selling?</h2>
          <p className="text-xl mb-8">Join thousands of creators making a living on Dokan Load</p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/sell">Become a Seller</Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;