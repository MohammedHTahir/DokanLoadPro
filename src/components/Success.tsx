import React from 'react';

const Success: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-gray-500">Thank you for your purchase. You can now download your items from your profile.</p>
    </div>
  );
};

export default Success;
