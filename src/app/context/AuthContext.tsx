import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';
import { tokenStorage } from '../utils/storage';

interface Examiner {
  id: number;
  name: string;
  userName: string;
}

interface LoginResponse {
  examiner: Examiner;
  token: string;
}

interface AuthContextType {
  user: Examiner | null;
  login: (userName: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isLoggedIn: boolean;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if user is authenticated based on stored token
  const { data, isLoading, refetch } = useQuery<Examiner | null>({
    queryKey: ['me'],
    queryFn: async () => {
      const token = tokenStorage.get();
      if (!token) {
        return null;
      }
      
      try {
        const res = await api.get('/examiners/me');
        return res.data;
      } catch (error) {
        // If request fails, remove invalid token
        tokenStorage.remove();
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Initialize auth state on mount
  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  const loginMutation = useMutation({
    mutationFn: async ({
      userName,
      password,
    }: {
      userName: string;
      password: string;
    }) => {
      const response = await api.post<LoginResponse>('/examiners/login', { 
        userName, 
        password 
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Store token in localStorage
      tokenStorage.set(data.token);
      // Update user data in query cache
      queryClient.setQueryData(['me'], data.examiner);
    },
    onError: () => {
      // Ensure no stale token on login failure
      tokenStorage.remove();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        await api.post('/examiners/logout', {});
      } catch (error) {
        // Continue with logout even if API call fails
        console.warn('Logout API call failed:', error);
      }
    },
    onSettled: () => {
      // Always clear local state regardless of API response
      tokenStorage.remove();
      queryClient.setQueryData(['me'], null);
      queryClient.clear();
    },
  });

  const login = async (userName: string, password: string) => {
    await loginMutation.mutateAsync({ userName, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  // Check if user has valid token on initial load
  useEffect(() => {
    const token = tokenStorage.get();
    if (token && !data && !isLoading) {
      refetch();
    }
  }, [data, isLoading, refetch]);

  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        login,
        logout,
        isLoading: isLoading || loginMutation.isPending || logoutMutation.isPending,
        isLoggedIn: !!data,
        isInitialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
