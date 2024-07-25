export type User = {
  id: number;
  username: string;
  email: string;
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