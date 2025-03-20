import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Campo obrigatório"),
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
  password: z.string().min(1, "Campo obrigatório"),
});

export type RegisterSchema = z.infer<typeof registerSchema>