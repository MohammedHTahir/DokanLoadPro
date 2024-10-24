import React, { useState } from 'react';

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: productName,
          price: parseFloat(productPrice),
          description: productDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="mb-2 p-2 border"
      />
      <input
        type="text"
        placeholder="Product Price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        className="mb-2 p-2 border"
      />
      <textarea
        placeholder="Product Description"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        className="mb-2 p-2 border"
      />
      <button onClick={handleAddProduct} className="bg-blue-500 text-white p-2" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </div>
  );
};

export default AddProductForm;
