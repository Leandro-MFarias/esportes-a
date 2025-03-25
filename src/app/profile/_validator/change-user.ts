import { z } from "zod";

export const changeSchema = z.object({
  userName: z.string().min(3, "Minimo 3 caracteres").optional(),
  email: z.string().email("Email inválido").optional(),
})

export type ChangeSchema = z.infer<typeof changeSchema>