import React from 'react';
import { useParams } from 'react-router-dom';
import { products, getCategoryIcon } from '@/data/products';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from '@/contexts/CartContext';
import { useToast } from "@/components/ui/use-toast";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    return <div className="container mx-auto mt-8">Product not found</div>;
  }

  const CategoryIcon = getCategoryIcon(product.category);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold flex items-center">
              <CategoryIcon className="w-8 h-8 mr-2" />
              {product.name}
            </CardTitle>
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          </div>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded-lg" />
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Product Details</h3>
            <ul className="list-disc list-inside">
              <li>Category: {product.category}</li>
              <li>High-quality digital product</li>
              <li>Instant download after purchase</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button size="lg" onClick={handleAddToCart}>Add to Cart</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductDetail;