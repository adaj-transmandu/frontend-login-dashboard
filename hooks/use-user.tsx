import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';
import { User } from '@/types/user';


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
