import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get('session_id');

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your payment was successful. Thank you for your purchase!</p>
      <p>Your session ID: {sessionId}</p>
      {/* Provide download link or instructions here */}
    </div>
  );
};

export default Success;
