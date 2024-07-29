export type Role = {
    id: number,
    name: string,
}

export type User = {
    id: number;
    username: string;
    first_name: string,
    last_name: string,
    email: string;
    isActive: boolean,
    roles?: {
      id: number,
      name: string,
      pivot: {
        model_type: string,
        model_id: string,
        rolde_id: string,
      }[],
      permissions: {
        id: number,
        name: string,
      }[]
    }[];
}

export type Permission = {
  id: number,
  name: string,
  modules: {
    id: number,
    name: string,
    description: string,
    registered_by: string,
    company_id: string,
    pivot: {
      permission_id: string,
      module_id: string,
    },
    company: {
      id: number,
      name: string,
      description: string,
    }
  }[],
}

export type Module = {
  id: number,
  name: string,
  description: string,
  company_id: string,
}

export type Company = {
  id: 1,
  name: string,
  description: string,
  rif: string,
  cod_inac: string,
  fiscal_address: string,
  created_at: string,
  updated_at: string,
}