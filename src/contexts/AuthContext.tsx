'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, Customer, type AuthResponse } from '@/lib/api/auth';

interface AuthContextType {
  customer: Customer | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    company?: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'losreyes_auth_token';
const CUSTOMER_KEY = 'losreyes_customer';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const loadAuthState = () => {
      try {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedCustomer = localStorage.getItem(CUSTOMER_KEY);

        if (storedToken && storedCustomer) {
          setToken(storedToken);
          setCustomer(JSON.parse(storedCustomer));
        }
      } catch (error) {
        console.error('Failed to load auth state:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(CUSTOMER_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthState();
  }, []);

  // Auto-refresh profile periodically
  useEffect(() => {
    if (!token) return;

    const refreshInterval = setInterval(async () => {
      try {
        const response = await authAPI.getProfile(token);
        if (response.success) {
          setCustomer(response.customer);
          localStorage.setItem(CUSTOMER_KEY, JSON.stringify(response.customer));
        }
      } catch (error) {
        console.error('Failed to refresh profile:', error);
      }
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(refreshInterval);
  }, [token]);

  const saveAuthState = (authData: AuthResponse) => {
    setToken(authData.token);
    setCustomer(authData.customer);
    localStorage.setItem(TOKEN_KEY, authData.token);
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(authData.customer));
  };

  const clearAuthState = () => {
    setToken(null);
    setCustomer(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_KEY);
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.success) {
        saveAuthState(response);
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const register = useCallback(async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    company?: string;
    phone?: string;
  }) => {
    try {
      const response = await authAPI.register(data);
      if (response.success) {
        saveAuthState(response);
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (token) {
        await authAPI.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthState();
    }
  }, [token]);

  const refreshProfile = useCallback(async () => {
    if (!token) return;

    try {
      const response = await authAPI.getProfile(token);
      if (response.success) {
        setCustomer(response.customer);
        localStorage.setItem(CUSTOMER_KEY, JSON.stringify(response.customer));
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
      throw error;
    }
  }, [token]);

  const value: AuthContextType = {
    customer,
    token,
    isLoading,
    isAuthenticated: !!token && !!customer,
    login,
    register,
    logout,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
