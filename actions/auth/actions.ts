import axiosInstance from '@/lib/axios'
import { createCookie } from '@/lib/cookie'
import { createSession } from '@/lib/session'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cookies } from 'next/headers'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware?: string   
  redirectIfAuthenticated?: string
}) => {

  const router = useRouter();
  const queryClient = useQueryClient()
  
  const loginMutation = useMutation({
    mutationFn: async (data: { login: string; password: string; }) => {
      const response = await axiosInstance.post('/login', data)
      const token: string = response.headers['authorization']
      await createCookie("auth_token", token);
      await createSession(response.data.userId);
      await router.push('/dashboard')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast('Hey', {
        description: 'Inicio correcto...'
      })
    },
    onError: (error) => {
      toast('Hey', {
        description: `No inicio correctamente: ${error}`  
      })
    },
  })


  return {
    login: loginMutation,
  }
}
