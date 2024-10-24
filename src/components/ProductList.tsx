import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="mb-2">
            <span>{product.name} - ${product.price}</span>
            <button className="ml-2 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
