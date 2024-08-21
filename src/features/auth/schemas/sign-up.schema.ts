import { z } from "zod";

const passwordBasicSchema = z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .refine((value) => {
        const hasUpperOrLowerCase = /[A-Za-z]/.test(value);
        const hasSymbols = /[!@#$%^&*()_+-=[\]{};':"|,.<>/ ?]+/.test(value);
        if (hasUpperOrLowerCase && hasSymbols) {
            return true;
        }
        return false;
    }, {
        message: "La contraseña debe tener al menos una mayúscula, una minúscula y un símbolo"
    });

export const passwordFullSchema = z.object({
    password: passwordBasicSchema,
    repeatPassword: passwordBasicSchema,
}).refine(values => {
    if (values.password !== values.repeatPassword) {
        return false;
    }
    return true;
}, {
    path: ["password"],
    message: "Las contraseñas no coinciden",
});

export const signUpSchema = z.object({
    username: z.string().min(1, {
        message: "El nombre de usuario es requerido",
    }),
    password: passwordBasicSchema,
    email: z.string().min(1, { message: "El correo electrónico es requerido" }).email({
        message: "El correo electrónico no es válido",
    }),
    repeatPassword: passwordBasicSchema,
}).refine(values => {
    if (values.password !== values.repeatPassword) {
        return false;
    }
    return true;
}, {
    path: ["password"],
    message: "Las contraseñas no coinciden",
});

