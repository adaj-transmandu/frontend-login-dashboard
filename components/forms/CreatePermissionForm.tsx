'use client';
import { useCreatePermission } from "@/actions/permisos/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCompanies } from "@/hooks/useGetCompanies";
import { useGetModulesByCompanyId } from "@/hooks/useGetModulesByCompanyId";
import { Company } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";


const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
  label: z.string().min(3, {
    message: "La etiqueta debe tener al menos 3 carácters.",
  }),
  module: z.string(),
  company: z.string(),
})


export default function CreatePermisssionForm({setOpen}: {
  setOpen: Dispatch<SetStateAction<boolean>>
}) {

  const [selectedCompany, setSelectedCompany] = useState<Company>();
  
  const { data: companies, error: companiesError, isLoading: isCompaniesLoading } = useGetCompanies();

  const { mutate: fetchModules, data: modules, isPending } = useGetModulesByCompanyId();

  const {createPermission} = useCreatePermission();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      label: "",
      company: "",
      module: "",
    },
  })

  const { control } = form;

  const onValueChange = (value: string) => {
    const company = companies?.find(company => company.id.toString() === value);
    setSelectedCompany(company)
  }

  useEffect(() => {
    if (selectedCompany) {
      fetchModules(selectedCompany.id);
      console.log(modules)
    }
  }, [selectedCompany, fetchModules]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formattedValues = {
      name: values.name,
      company: parseInt(values.company),
      module: parseInt(values.module),
    }
    createPermission.mutate(formattedValues);
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
                <Input placeholder="EJ: inventario.crear" {...field} />
              </FormControl>
              <FormDescription>
                Este será el nombre de su permiso.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={control}
        name="label"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Etiqueta</FormLabel>
            <FormControl>
            <Input placeholder="EJ: Creación de usuario" {...field} />
            </FormControl>
            <FormDescription>
            Agregue una <strong>etiqueta</strong> al permiso.
            </FormDescription>
            <FormMessage />
        </FormItem>
          )}
        />
        <FormField
        control={control}
        name="company"
        render={({ field }) => (
        <FormItem>
          <FormLabel>Compañía</FormLabel>
          <Select onValueChange={(event) => {
            field.onChange(event)
            onValueChange(event)
          }}
          >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la compañia..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {
                  isCompaniesLoading && <div>Cargando...</div> 
                }
                {
                  companies && companies.map(company => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.description}
                    </SelectItem>
                    ))
                }
              </SelectContent>
            </Select>
          <FormDescription>
          Especifíque la compañía a la que pertenecerá el permiso.
          </FormDescription>
          <FormMessage />
        </FormItem>
          )}
        />
        <FormField
        control={control}
        name="module"
        render={({ field }) => (
        <FormItem>
          <FormLabel>Modulo</FormLabel>
          <Select
            disabled={!selectedCompany || isPending} 
            onValueChange={field.onChange}
          >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el módulo..." />
                  {isPending && <Loader2 className="animate-spin" />}
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {modules && modules.map(module => (
                  <SelectItem key={module.id} value={module.id.toString()}>
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          <FormDescription>
          Especifíque el modulo al pertenecerá.
          </FormDescription>
          <FormMessage />
        </FormItem>
          )}
        />
        <Button className="bg-primary mt-2 text-white hover:bg-blue-900 disabled:bg-primary/70" disabled={createPermission?.isPending} type="submit">
          {createPermission?.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Crear</p>}
        </Button>
      </form>
    </Form>
  )
}