import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Search, Menu, X, ShoppingCart, User } from 'lucide-react'
import { useCart } from '@/contexts/CartContext';
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from '@/components/Dashboard';
import HomePage from '@/components/HomePage';
import ProductListing from '@/components/ProductListing';
import ProductDetail from '@/components/ProductDetail';
import UserProfile from '@/components/UserProfile';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import ProtectedRoute from '@/components/ProtectedRoute';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { SignIn, SignUp } from '@clerk/clerk-react'; // Import SignIn and SignUp components
import Success from '@/components/Success';
import Cancel from '@/components/Cancel';
import SellerDashboard from '@/components/SellerDashboard';

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="py-4 px-6 md:px-12 flex items-center justify-between border-b">
        <div className="flex items-center">
          <ShoppingBag className="h-6 w-6 mr-2" />
          <Link to="/">
            <div>
              <span className="text-xl font-bold">Dokan Load</span>
              <span className="text-xs block text-muted-foreground">(Arabic for "Shop & Download")</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild><Link to="/products">Products</Link></Button>
          <Button variant="ghost">Sell</Button>
          <Button variant="ghost">About</Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block relative">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {isSignedIn ? (
            <>
              <Link to="/profile">
                <Button variant="ghost" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost">Log In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button variant="primary">Sign Up</Button>
              </SignUpButton>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge variant="destructive" className="absolute -top-2 -right-2">
                  {getCartCount()}
                </Badge>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Shopping Cart</SheetTitle>
                <SheetDescription>
                  Review your items and checkout
                </SheetDescription>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>
          <Button variant="outline" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <nav className="flex flex-col p-4">
            <Link to="/products" className="py-2">Products</Link>
            <Link to="#" className="py-2">Sell</Link>
            <Link to="#" className="py-2">About</Link>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/sign-in/*" element={<SignIn />} /> {/* Add SignIn route */}
          <Route path="/sign-up/*" element={<SignUp />} /> {/* Add SignUp route */}
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/seller-dashboard" element={
            <ProtectedRoute>
              <SellerDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default AppContent;
