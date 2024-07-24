import axiosInstance from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useInventory = () => {

    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: async (data: {name: string, description: string, amount: number, location: string}) => {
            await axiosInstance.post('/inventario', data)
          },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['inventario']})
            toast("¡Creado!", {
                description: `La pieza ha sido creada correctamente.`
            })
          },
        onError: (error) => {
            toast('Hey', {
              description: 'No inicio correctamente...'
            })
          },
        }
    )

    return {
      createItem: createMutation,
    }
}