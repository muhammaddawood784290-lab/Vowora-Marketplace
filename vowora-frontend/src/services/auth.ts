import type { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

let authState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Demo user store for local dev without backend
const demoUsers: Record<string, User> = {
  'customer@vowora.com': {
    id: 'user-c1',
    email: 'customer@vowora.com',
    firstName: 'Sophia',
    lastName: 'Chen',
    role: 'customer',
    phone: '+1 415 555 0123',
    isActive: true,
    createdAt: '2025-01-15T10:00:00Z',
  },
  'vendor@vowora.com': {
    id: 'user-v1',
    email: 'vendor@vowora.com',
    firstName: 'Elena',
    lastName: 'Vasquez',
    role: 'vendor',
    phone: '+1 212 555 0789',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616-round?w=100',
    isActive: true,
    createdAt: '2024-08-10T09:00:00Z',
  },
  'planner@vowora.com': {
    id: 'user-p1',
    email: 'planner@vowora.com',
    firstName: 'Amara',
    lastName: 'Okechukwu',
    role: 'planner',
    phone: '+1 305 555 0654',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100',
    isActive: true,
    createdAt: '2024-06-15T08:00:00Z',
  },
  'admin@vowora.com': {
    id: 'user-a1',
    email: 'admin@vowora.com',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
};

export const authService = {
  login(email: string, password: string): User | null {
    const user = demoUsers[email];
    if (user && password === 'demo123') {
      authState = {
        user,
        token: `demo-token-${user.id}`,
        isAuthenticated: true,
      };
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('vowora_auth', JSON.stringify(authState));
      }
      return user;
    }
    return null;
  },

  logout(): void {
    authState = {
      user: null,
      token: null,
      isAuthenticated: false,
    };
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('vowora_auth');
    }
  },

  initFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('vowora_auth');
      if (stored) {
        try {
          authState = JSON.parse(stored);
        } catch {
          authState = { user: null, token: null, isAuthenticated: false };
        }
      }
    }
  },

  getState(): AuthState {
    return authState;
  },

  getUser(): User | null {
    return authState.user;
  },

  isAuthenticated(): boolean {
    return authState.isAuthenticated;
  },

  hasRole(role: string): boolean {
    return authState.user?.role === role;
  },

  isCustomer(): boolean {
    return authState.user?.role === 'customer';
  },

  isVendor(): boolean {
    return authState.user?.role === 'vendor';
  },

  isPlanner(): boolean {
    return authState.user?.role === 'planner';
  },

  isAdmin(): boolean {
    return authState.user?.role === 'admin';
  },
};

export default authService;
