import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  name?: string;
  purchases: string[]; // Array to hold purchased item IDs or details
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  recordPurchase: (productId: string) => void; // Function to record a purchase
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      console.log("Loaded user from localStorage:", parsedUser); // Add this line
      setUser(parsedUser);
    }
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      // Mock signup success
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        purchases: [] // Initialize purchases as an empty array
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Account created",
        description: "Welcome to Dokan Load!"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive"
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        purchases: []
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      console.log("User saved to localStorage:", mockUser); // Add this line

      toast({
        title: "Welcome back!",
        description: "Successfully logged in"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "Successfully signed out"
    });
  };

  const recordPurchase = (productId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        purchases: [...user.purchases, productId],
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log("Purchase recorded:", updatedUser); // Add this line for debugging
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, recordPurchase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
