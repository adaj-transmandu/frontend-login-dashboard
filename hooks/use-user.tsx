import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

interface User {
  id: number;
  username: string;
  email: string;
  // Otros campos que pueda tener tu usuario
}

const fetchUser = async (): Promise<User> => {
  const { data } = await axios.get('/user');
  return data;
};

export const useGetUser = () => {
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
