import { BrowserRouter as Router } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { CartProvider } from '@/contexts/CartContext';
import AppContent from './AppContent';
import { Toaster } from "@/components/ui/toaster";

// Use environment variable for Clerk publishable key
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error('Missing Clerk Publishable Key');
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <CartProvider>
        <Router>
          <AppContent />
          <Toaster />
        </Router>
      </CartProvider>
    </ClerkProvider>
  );
}

export default App;