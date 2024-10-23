import React from 'react';
import { Link } from 'react-router-dom';
import { products, getCategoryIcon } from '@/data/products';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/components/ui/use-toast";

const ProductListing: React.FC = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const CategoryIcon = getCategoryIcon(product.category);
          return (
            <Card key={product.id} className="flex flex-col">
              <CardHeader>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardTitle className="flex items-center">
                  <CategoryIcon className="w-5 h-5 mr-2" />
                  {product.name}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link to={`/product/${product.id}`}>View Details</Link>
                </Button>
                <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProductListing;