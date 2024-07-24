"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useCreateUser } from "@/actions/usuarios/actions"
import { Input } from "@/components/ui/input"
import { useGetUsers } from "@/hooks/use-users"
import loadingGif from '@/public/loading2.gif'
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"

const FormSchema = z.object({
  first_name: z.string().min(3, {
    message: "El usuario debe tener al menos 3 caracteres.",
  }),
  last_name: z.string().min(2, {
    message: "La contraseña debe tener al menos 5 caracteres.",
  }),
  username: z.string().min(2, {
    message: "La contraseña debe tener al menos 5 caracteres.",
  }),
  password: z.string().min(2, {
    message: "La contraseña debe tener al menos 5 caracteres.",
  }),
  email: z.string().email({
    message: "Debe ingresar un correo electrónico válido."
  }),
  company: z.string().email({
    message: "Debe ingresar un correo electrónico válido."
  }).optional(),
  isActive: z.boolean(),
})

type FormSchemaType = z.infer<typeof FormSchema>

export function CreateUserForm() {

  const {data: users, error, isLoading} = useGetUsers();


  const {createUser} = useCreateUser();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      email: "",
      isActive: true,
    },
  })

  const { setValue, control, setError, clearErrors } = form;
  const firstName = useWatch({ control, name: 'first_name' });
  const lastName = useWatch({ control, name: 'last_name' });
  const [debouncedUsername, setDebouncedUsername] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      if (firstName && lastName) {
        const newUsername = `${firstName.charAt(0)}${lastName}`.toLowerCase();
        const isUsernameTaken = users?.some(user => user.username === newUsername);

        if (isUsernameTaken) {
          setError("username", {
            type: "manual",
            message: "El nombre de usuario ya está en uso."
          });
        } else {
          clearErrors("username");
          setDebouncedUsername(newUsername);
        }    
      }
    }, 500); // Ajusta el tiempo del debounce según sea necesario

    return () => {
      clearTimeout(handler);
    };
  }, [firstName, lastName]);

  useEffect(() => {
    if (debouncedUsername) {
      setValue('username', debouncedUsername);
    }
  }, [debouncedUsername, setValue]);

  const onSubmit = (data: FormSchemaType) => {
    const isUsernameTaken = users?.some(user => user.username === data.username);
    if(isUsernameTaken) {
      setError("username", {
        type: "manual",
        message: "El nombre de usuario ya está en uso."
      });
    } else {
      clearErrors("username")
      createUser.mutate(data);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-3">
        <div className='flex gap-2 items-center'>
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Angel" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Perez" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input placeholder="Ej: example@example.com" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Ej: aperez" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password"{...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Empresa</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una empresa..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="transmandu">Transmandu, C.A</SelectItem>
                  <SelectItem value="hangar74">Hangar74</SelectItem>
                  <SelectItem value="avsec+">AVSEC</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-xs">
                Ingrese la empresa a la cual pertenece.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormLabel>¿Se encuentra activo?</FormLabel>
              <FormControl>
                <Checkbox
                className="checked:bg-primary"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Sí, el usuario se encuentra activo.
                </FormLabel>
                <FormDescription>
                  Indique si el usuario está actualmente activo de manera laboral.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center gap-x-4">
          <Separator className="flex-1" />
          <p className="text-muted-foreground">SIGEAC</p>
          <Separator className="flex-1" />
        </div>
        <Button className="bg-primary text-white hover:bg-blue-900 disabled:bg-slate-50 disabled:border-dashed disabled:border-black" disabled={createUser?.isPending} type="submit">
          {createUser?.isPending ? <Image className="text-black" src={loadingGif} width={170} height={170} alt="Loading..." /> : <p>Iniciar Sesion</p>}
        </Button>
      </form>
    </Form>
  )
}