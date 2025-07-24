'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authUtils, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const currentUser = authUtils.getUser();
      const token = authUtils.getToken();
      
      if (currentUser && token) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Demo authentication - in real app, this would be an API call
      if (email === 'demo@example.com' && password === 'password123') {
        const user: User = {
          email: 'demo@example.com',
          name: 'Demo User',
          id: 'demo-user-id'
        };
        
        const tokens = {
          accessToken: 'demo-access-token',
          refreshToken: 'demo-refresh-token'
        };
        
        authUtils.setAuthData(user, tokens);
        setUser(user);
        router.push('/home');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Demo registration - in real app, this would be an API call
      const user: User = {
        email,
        name,
        id: 'user-' + Date.now()
      };
      
      const tokens = {
        accessToken: 'demo-access-token-' + Date.now(),
        refreshToken: 'demo-refresh-token-' + Date.now()
      };
      
      authUtils.setAuthData(user, tokens);
      setUser(user);
      router.push('/home');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    authUtils.clearAuth();
    setUser(null);
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}