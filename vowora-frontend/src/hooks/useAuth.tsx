/* eslint-disable */
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
/** @jsxImportSource react */
import { authService } from '../services/auth';
import type { User } from '../types';
import type { ReactNode } from 'react';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  hasRole: (role: string) => boolean;
  isCustomer: () => boolean;
  isVendor: () => boolean;
  isPlanner: () => boolean;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService.initFromStorage();
    const state = authService.getState();
    setUser(state.user);
    setIsLoading(false);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const user = authService.login(email, password);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: authService.isAuthenticated(),
    isLoading,
    login,
    logout,
    hasRole: (role) => authService.hasRole(role),
    isCustomer: () => authService.isCustomer(),
    isVendor: () => authService.isVendor(),
    isPlanner: () => authService.isPlanner(),
    isAdmin: () => authService.isAdmin(),
  };

  // Return JSX
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;
