import { useQuery } from '@tanstack/react-query';
import axios from '@/lib/axios';

interface Roles {
  id: number;
  name: string;
}[]

const fetchRoles = async (): Promise<Roles[]> => {
  const  response  = await axios.get('/role');
  const roles = response.data
  return roles;
};

export const useGetRoles = () => {
  return useQuery<Roles[]>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
