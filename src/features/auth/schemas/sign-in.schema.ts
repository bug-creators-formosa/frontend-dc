import { z } from "zod";
import { SignInParams } from "../services/auth";

export const signInSchema = z.object({
    name: z.string({ message: "El nombre de usuario es requerido" }).min(1, {
        message: "El nombre de usuario es requerido"
    }),
    password: z.string({ message: "La contraseña es requerida" }).min(1, {
        message: "La contraseña es requerida"
    }),
})

signInSchema._output satisfies SignInParams;