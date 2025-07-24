'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';
import { useUserProfileStore } from '@/stores/user-profile';
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
  const { user, isLoading, setUser, setLoading, setTokens, logout: logoutStore } = useAuthStore();
  const { hasCompletedGuide } = useUserProfileStore();
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
      setLoading(false);
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
        setTokens(tokens.accessToken, tokens.refreshToken);
        
        // Check if user has completed guide
        if (hasCompletedGuide()) {
          router.push('/home');
        } else {
          router.push('/guide');
        }
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
      setTokens(tokens.accessToken, tokens.refreshToken);
      // New users go to guide first
      router.push('/guide');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    authUtils.clearAuth();
    logoutStore();
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