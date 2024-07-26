'use client';
import { useCreateRole } from "@/actions/roles/actions";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import loadingGif from '@/public/loading2.gif'
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
})

export default function CreateRoleForm() {
	
	const {createRole} = useCreateRole();


	const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const { control } = form;

	const onSubmit = async (values: z.infer<typeof formSchema> ) => {
		createRole.mutate(values);
  }


  return (
    <Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
			<FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="EJ: Admin..." {...field} />
              </FormControl>
              <FormDescription>
                Este será el nombre del rol.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
      />
      <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permisos</FormLabel>
              <FormControl>
              <Tabs defaultValue="almacen" >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="almacen">Almacen</TabsTrigger>
                  <TabsTrigger value="planificacion">Planificacion</TabsTrigger>
                </TabsList>
                <TabsContent value="almacen">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        PERMISO
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        PERMISO
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        PERMISO
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        PERMISO
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        PERMISO
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        PERMISO
                      </label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="planificacion">
                  planificacion
                </TabsContent>
              </Tabs>
              </FormControl>
              <FormDescription>
                Estos serán los permisos asignados al rol.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
      />
      <Button className="bg-primary mt-2 text-white hover:bg-blue-900 disabled:bg-primary/70" disabled={createRole?.isPending} type="submit">
        {createRole?.isPending ? <Loader2 className="size-4 animate-spin" />: <p>Crear</p>}
      </Button>
			</form>	
    </Form>
  )
}