import { z } from "zod";

export const postSchema = z
  .object({
    title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
    content: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
    category: z.string().optional(),
    existingCategory: z.string().optional(),
    id: z.string().optional(),
    mediaUrl: z.any().optional(),
  })
  .refine(
    (data) => {
      return data.category || data.existingCategory;
    },
    {
      message: "Você deve selecionar uma categoria existente ou criar uma nova",
      path: ["existingCategory"],
    }
  );

export type PostSchema = z.infer<typeof postSchema>;
