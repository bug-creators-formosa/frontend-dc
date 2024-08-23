import { z } from "zod";

export const formSchema = z.object({
    title: z
        .string()
        .min(1, {
            message: "El título es requerido",
        })
        .max(255, {
            message: "El título no debe ser tan largo",
        }),
    description: z
        .string()
        .min(1, {
            message: "La descripción es requerida",
        })
        .max(9999, {
            message: "La descripción no puede ser tan larga",
        }),
    report_type_id: z.string({
        message: "El tipo es requerido",
    }),
    image: z.optional(z.instanceof(File)),
    address: z.string({
        message: "Por favor mencione la dirección",
    }),
});