import { api } from "@/features/common/api";
import { User } from "../interfaces/user";

export type SignInParams = {
    name: string;
    password: string;
}
export type SignInResponse = {
    access_token: string;
    user: User;
}

export async function signIn(params: SignInParams) {
    const response = await api.post<SignInResponse>("/auth/sign-in", {
        name: params.name,
        password: params.password
    });

    return response;
}

export type SignUpParams = {
    username: string;
    email: string;
    password: string;
    community_id?: string;
}

export type SignUpResponse = {
    access_token: string;
    user: User
}

export async function signUp(params: SignUpParams) {
    const response = await api.post<SignUpResponse>("/auth/sign-up", params);

    return response;
}
