'use client';

import { default as axios, default as axiosInstance } from '@/lib/axios';
import { createCookie } from '@/lib/cookie';
import { createSession, deleteSession } from '@/lib/session';
import { User } from '@/types/user';
import { useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginMutation: UseMutationResult<any, any, {
    login: string;
    password: string;
}, unknown>
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (): Promise<User> => {
    setLoading(true)
    const { data } = await axiosInstance.get('/user');
    if(data){
      setUser(data)
      setLoading(false)
    } else {
      setUser(null)
      setLoading(false)
    }
    return data;
  };

  const userQuery = useQuery({
    queryKey: ['user'], 
    queryFn: fetchUser, 
    enabled: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  useEffect(() => {
    userQuery.refetch();
    router.refresh();
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (data: { login: string; password: string; }) => {
      const response = await axiosInstance.post('/login', data)
      const token: string = response.headers['authorization']
      await createCookie("auth_token", token);
      await createSession(response.data.userId);
      await setUser(response.data)
      await router.push('/dashboard')
      toast('Hey', {
        description: 'Inicio correcto...'
      })
      return response.data;
    },
    onSuccess: () => {
      userQuery.refetch();
      setError(null);
    },
    onError: (err: any) => {
      setError(err.message);
    },
  });

  const logout = async () => {
    try {
      await deleteSession();
      await localStorage.clear();
      setUser(null);
      queryClient.clear();
      router.push('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, loginMutation, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro del AuthProvider');
  }
  return context;
};
