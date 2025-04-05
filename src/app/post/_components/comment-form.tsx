"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommentSchema, commentSchema } from "../_validator/comments";
import { createComment } from "../_actions/comment-action";
import { toast } from "sonner";
import { Comment } from "./comments";

interface FormProps {
  postId: string;
  commentAdded?: (comment: Comment) => void;
}

export function CommentForm({ postId, commentAdded }: FormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId,
    },
  });

  async function handleForm(data: CommentSchema) {
    console.log(data);
    try {
      const result = await createComment(data);

      if (result.success) {
        toast.success("Comentário criado");

        if (commentAdded && result.comment) {
          commentAdded(result.comment);
        }
      } else {
        toast.error(result.message);
      }
      
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar seu comentário");
    } finally {
      resetField("content")
    }
  }

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <Input
        type="text"
        placeholder="Adicionar um comentário"
        {...register("content")}
        disabled={isSubmitting}
      />
    </form>
  );
}
