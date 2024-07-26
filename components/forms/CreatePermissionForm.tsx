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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
  description: z.string().min(3, {
    message: "La descripción debe contener al menos 3 carácteres."
  }),
  module: z.string().min(3,{
    message:  "La descripción debe contener al menos 3 carácteres.",
  }),
  company: z.string().min(3,{
    message: "Debe escoger una empresa."
  })
})

interface Company {
  id: number;
  name: string;
}

interface Module {
  id: number;
  name: string;
  companyId: number;
}

const companies: Company[] = [
  { id: 1, name: 'Company A' },
  { id: 2, name: 'Company B' },
];

const allModules: Module[] = [
  { id: 1, name: 'Module 1', companyId: 1 },
  { id: 2, name: 'Module 2', companyId: 1 },
  { id: 3, name: 'Module 3', companyId: 2 },
];

export default function CreatePermisssionForm() {

  const { createRole } = useCreateRole();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  useEffect(() => {
    if (selectedCompany) {
      const filteredModules = allModules.filter(module => module.companyId === selectedCompany.id);
      setModules(filteredModules);
    } else {
      setModules([]);
    }
  }, [selectedCompany]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      company: "",
      module: "",
    },
  })

  const { control } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
                <Input placeholder="EJ: Admin" {...field} />
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
        name="description"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Descripción</FormLabel>
            <FormControl>
            <Input placeholder="EJ: Creación de usuario" {...field} />
            </FormControl>
            <FormDescription>
            Agregue una <strong>pequeña</strong> descripción del permiso.
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
          <Select onValueChange={(value) => {
            const company = companies.find(company => company.id.toString() === value);
            setSelectedCompany(company || null);
            setSelectedModule(null);
          }}
          >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la compañia..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
              {companies.map(company => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
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
          <Select onValueChange={(value) => {
              const module = modules.find(module => module.id.toString() === value);
              setSelectedModule(module || null);
            }}
            disabled={!selectedCompany}
          >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el módulo..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module.id} value={module.id.toString()}>
                    {module.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          <FormDescription>
          Especifíque la compañía a la que pertenecerá el permiso.
          </FormDescription>
          <FormMessage />
        </FormItem>
          )}
        />
        <Button className="bg-primary mt-2 text-white hover:bg-blue-900 disabled:bg-primary/70" disabled={createRole?.isPending} type="submit">
          {createRole?.isPending ? <Loader2 className="size-4 animate-spin" /> : <p>Crear</p>}
        </Button>
      </form>
    </Form>
  )
}