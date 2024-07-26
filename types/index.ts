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
  companies: {
    id: number,
    name: string,
  }[],
}