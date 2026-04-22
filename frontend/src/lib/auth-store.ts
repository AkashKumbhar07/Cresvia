import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email?: string;
  name: string;
  avatar_url?: string;
  onboarded: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user) =>
        set({ user, isAuthenticated: !!user }),

      setAccessToken: (token) =>
        set({ accessToken: token }),

      login: (token, user) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', token);
        }
        set({ accessToken: token, user, isAuthenticated: true, isLoading: false });
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
        }
        set({ accessToken: null, user: null, isAuthenticated: false });
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'cresvia-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);