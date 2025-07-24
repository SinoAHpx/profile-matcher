import Cookies from 'js-cookie';

export interface User {
  email: string;
  name: string;
  id: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

const AUTH_STORAGE_KEY = 'auth_user';
const TOKEN_COOKIE_KEY = 'auth_token';
const REFRESH_COOKIE_KEY = 'auth_refresh';

export const authUtils = {
  setAuthData(user: User, tokens: AuthTokens) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    Cookies.set(TOKEN_COOKIE_KEY, tokens.accessToken, { 
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    
    if (tokens.refreshToken) {
      Cookies.set(REFRESH_COOKIE_KEY, tokens.refreshToken, { 
        expires: 30, // 30 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
    }
  },

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  getToken(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    return Cookies.get(TOKEN_COOKIE_KEY);
  },

  getRefreshToken(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    return Cookies.get(REFRESH_COOKIE_KEY);
  },

  clearAuth() {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(AUTH_STORAGE_KEY);
    Cookies.remove(TOKEN_COOKIE_KEY);
    Cookies.remove(REFRESH_COOKIE_KEY);
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!this.getToken() && !!this.getUser();
  }
};