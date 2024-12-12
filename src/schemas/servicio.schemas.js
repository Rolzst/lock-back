import { z } from 'zod';

export const servicioSchema = z.object({
    nom_servicio: z.string({
        required_error: "EL nombre del servicio es obligatorio es obligatoria",
    }),
    email_serv: z.string({
        required_error: "El correo del servicio es obligatorio",
    }),
    contrasenia: z.string({
        required_error: 'La contraseña es obligatoria',
    }),
    user: z.string({
        required_error: 'El usuario es obligatorio',
    }),
})