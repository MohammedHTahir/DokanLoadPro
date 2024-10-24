import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductList from './ProductList'; // Create this component
import AddProductForm from './AddProductForm'; // Create this component

const SellerDashboard: React.FC = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => setShowAddProduct(false)}>View Products</Button>
            <Button className="w-full mt-2" onClick={() => setShowAddProduct(true)}>Add New Product</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Sales: $0.00</p>
            <Button className="w-full mt-2">View Sales</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Update Profile</Button>
            <Button className="w-full mt-2">Payment Methods</Button>
          </CardContent>
        </Card>
      </div>
      {showAddProduct ? <AddProductForm /> : <ProductList />}
    </div>
  );
};

export default SellerDashboard;
