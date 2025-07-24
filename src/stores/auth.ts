import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/lib/auth';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  setTokens: (token: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      token: null,
      refreshToken: null,
      
      setUser: (user) => set({ user }),
      
      setTokens: (token, refreshToken) => set({ token, refreshToken }),
      
      setLoading: (isLoading) => set({ isLoading }),
      
      logout: () => set({ user: null, token: null, refreshToken: null }),
    }),
    {
      name: 'auth-store',
    }
  )
);