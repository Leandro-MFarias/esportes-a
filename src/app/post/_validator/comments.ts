import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(3, "Campo obrigatório"),
  postId: z.string().uuid("ID do post inválido")
})

export type CommentSchema = z.infer<typeof commentSchema>
