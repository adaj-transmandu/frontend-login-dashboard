import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface CreateFormSchema {
    first_name: string,
    last_name: string,
    username: string;
    email: string;
    isActive: boolean;
  }

export const useCreateUser = () => {

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: async (data: CreateFormSchema) => {
            await axiosInstance.post('/register', data)
          },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']})
            toast("¡Creado!", {
                description: `¡El usuario se ha creado correctamente!`
            })
          },
        onError: (error) => {
            toast('Hey', {
              description: `No se creo correctamente: ${error}`
            })
          },
        }
    )

    return {
      createUser: createMutation,
    }
}