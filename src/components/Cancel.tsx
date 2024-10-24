import React from 'react';

const Cancel: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Payment Canceled</h1>
      <p className="text-gray-500">Your payment was canceled. You can try again or contact support if you need help.</p>
    </div>
  );
};

export default Cancel;
