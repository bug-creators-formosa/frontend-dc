import { Roles } from "../constants/roles";


export type User = {
  user_id: string;
  email: string;
  username: string;
  user_roles: {
    name: Roles
  }[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
