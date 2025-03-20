import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Campo obrigatório"),
  email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
  password: z.string().min(1, "Campo obrigatório"),
});

export const loginSchema = z.object({
  email: z.string().min(3, "Digite um email valido"),
  password: z.string().min(3, "Digite uma senha valida"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>