import { User } from "@/features/auth/interfaces/user";
import { api } from "@/features/common/api";
import { z } from "zod";

type GetUserParams = URLSearchParams | undefined;

export async function getUsers(params: GetUserParams) {
  try {
    const response = await api.get<User[]>(
      `/users?${params?.toString() ?? ""}`
    );
    return response.data;
  } catch (err) {
    console.error("getUsers error: ", err);
    throw err;
  }
}

export const validUserIdSchema = z.object({
  id: z.string(),
});

export async function getUserById(userId: string) {
  try {
    const response = await api.get<User>(`/users/${userId}`);
    return response.data;
  } catch (err) {
    console.error("getUserById error: ", err);
    throw err;
  }
}

export async function updateUserRoles(userId: string, roles: string[]) {
  try {
    const response = await api.put(`/users/${userId}/roles`, { roles: roles });
    return response.data;
  } catch (err) {
    console.error("updateUserRoles error: ", err);
    throw err;
  }
}
