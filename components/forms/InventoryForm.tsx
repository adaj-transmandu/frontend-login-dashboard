'use client'

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useInventory } from "@/actions/inventario/actions"

const formSchema = z.object({
    name: z.string().min(3, {
      message: "El usuario debe tener al menos 3 caracteres.",
    }),
    description: z.string().min(2, {
      message: "La contraseña debe tener al menos 5 carácteres.",
    }),
    serial: z.string().min(2, {
        message: "El serial debe contener al menos 2 carácteres.",
      }),
    amount: z.number().nonnegative({
        message: "No puede ingresar valores negativos."
    }),
    location: z.string().min(2, {
        message: "La contraseña debe tener al menos 5 caracteres.",
    }),
    
  })



const InventoryForm = () => {

  const {createItem} = useInventory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      serial: "",
      amount: 0,
      location: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createItem.mutate(values)
  }

  return (
    <Form {...form}>
        <form className="flex flex-col gap-4 max-w-2xl mx-auto" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de pieza</FormLabel>
                <FormControl>
                  <Input placeholder="Motor 4PAHL..." {...field} />
                </FormControl>
                <FormDescription>
                  Nombre del Item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción de pieza</FormLabel>
                <FormControl>
                  <Input placeholder="Motor V8 de..." {...field} />
                </FormControl>
                <FormDescription>
                  Breve descricion del Item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="serial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Serial del item</FormLabel>
                <FormControl>
                  <Input placeholder="SPB2900" {...field} />
                </FormControl>
                <FormDescription>
                  serial de identificación del Item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Motor 4PAHL..." {...field} onChange={event => field.onChange(+event.target.value)}/>
                </FormControl>
                <FormDescription>
                  Cantidad de items a ingresar
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pzo">Puerto Ordaz</SelectItem>
                    <SelectItem value="cbl">Ciudad Bolivar</SelectItem>
                  </SelectContent>
                </Select>
                </FormControl>
                <FormDescription>
                  Ubicación actual del item
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        <div>
        <Button disabled={form.formState.isLoading} className="bg-black text-white hover:bg-blue-600" type="submit">Agregar</Button>
        </div>
        </form>
    </Form>
  )
}

export default InventoryForm