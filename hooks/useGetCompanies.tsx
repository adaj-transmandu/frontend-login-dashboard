import axios from '@/lib/axios';
import { Company, Module, Permission } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchCompanies = async (): Promise<Company[]> => {
  const  {data}  = await axios.get('/company');
  return data;
};

export const useGetCompanies = () => {
  return useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};
