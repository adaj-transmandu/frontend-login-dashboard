import axios from '@/lib/axios';
import { Role } from '@/types/roles';
import { useQuery } from '@tanstack/react-query';



const fetchRoles = async (): Promise<Role[]> => {
  const  response  = await axios.get('/role');
  const roles = await response.data.users;
  return roles
};

export const useGetUsers = () => {
  return useQuery<Role[]>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
