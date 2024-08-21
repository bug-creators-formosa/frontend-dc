import { User } from "../auth/interfaces/user";

export const getInitials = (names: string) => {
  return names
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();
};


export const ROLE_TO_DISPLAY: Record<User["user_roles"][number]["name"], string> = {
  admin: "Administrador",
  authority: "Autoridad",
  user: "Usuario",
  verified_user: "Usuario verificado",
};