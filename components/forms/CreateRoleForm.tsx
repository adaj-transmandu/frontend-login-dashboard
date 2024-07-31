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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { useGetCompanies } from "@/hooks/useGetCompanies";
import { useGetModulesByCompanyId } from "@/hooks/useGetModulesByCompanyId";
import { Company, Module } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useGetPermissions } from "@/hooks/useGetPermissions";
import { Checkbox } from "../ui/checkbox";
import { permission } from "process";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 carácters.",
  }),
  company: z.string(),
  module: z.string(),
  permissions: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export default function CreateRoleForm() {

  const [selectedCompany, setSelectedCompany] = useState<Company>();

  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
	
	const {createRole} = useCreateRole();

  const {data: companies, isLoading} = useGetCompanies();

  const {data: permissions, isLoading: isPermissionLoading} = useGetPermissions();

  const { mutate: fetchModules, data: modules, isPending } = useGetModulesByCompanyId();

  useEffect(() => {
    if (selectedCompany) {
      fetchModules(selectedCompany.id);
      console.log(modules)
    }
  }, [selectedCompany, fetchModules]);

	const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      module: "",
      permissions: [],
    },
  })

  const { control } = form;

	const onSubmit = async (values: z.infer<typeof formSchema> ) => {
		createRole.mutate(values);
  }

  const onValueChange = (value: string) => {
    const company = companies?.find(company => company.id.toString() === value);
    setSelectedCompany(company)
  }

  const handleModuleChange = (moduleName: string) => {
    const module = modules?.find(m => m.name === moduleName) || null;
    setSelectedModule(module);
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
                  isLoading && <div>Cargando...</div> 
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
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permisos</FormLabel>
              <FormControl>
                <Tabs onValueChange={handleModuleChange}>
                  <TabsList className="grid w-full grid-cols-2">
                    {isPending && <Loader className="size-4 animate-spin" />}
                    {modules?.map((m) => (
                      <TabsTrigger value={m.name} key={m.id}>{m.name}</TabsTrigger>
                    ))}
                  </TabsList>
                  {selectedModule && (
                    <TabsContent value={selectedModule.name}>
                      {permissions?.filter(permission => 
                        permission.modules.some(mod => mod.id === selectedModule.id)
                      ).map(permission => (
                        <div key={permission.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={permission.name}
                            value={permission.id}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, permission.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== permission.id
                                    )
                                  )
                            }}
                          />
                          <label htmlFor={permission.name}>{permission.name}</label>
                        </div>
                      ))}
                    </TabsContent>
                  )}
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