import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

interface Users {
  id: number;
  first_name: string,
  last_name: string,
  username: string;
  email: string;
  isActive: boolean;
}[]

const fetchUsers = async (): Promise<Users[]> => {
  const  response  = await axios.get('/users');
  const users = await response.data.users;
  return users
};

export const useGetUsers = () => {
  return useQuery<Users[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
