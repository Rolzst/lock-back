import {z} from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido',
    }),
    email: z.string({
        required_error: 'El e-mail es requerido',
    }).email({
        required_error: 'El e-mail es inválido',
    }),
    password: z.string({
        required_error: 'La contraseña es requerida',
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
}); //registerSchema

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El e-mail es requerido',
    }).email({
        required_error: 'El e-mail es inválido',
    }),
    password: z.string({
        required_error: 'La contraseña es requerida',
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
})
