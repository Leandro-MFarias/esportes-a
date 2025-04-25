"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { deletePost } from "../_actions/delete-post";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  postId: string;
  onSuccess: () => void
}

export function DeleteButton({ postId, onSuccess }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  function handleDelete() {
    startTransition(async () => {
      const result = await deletePost(postId);

      if (result.success) {
        console.log("sucesso", result.message);
        toast.success(result.message);
        router.push("/")
        onSuccess()
      } else {
        console.log("Error", result.message);
        toast.error("Erro ao deletar o post");
      }
    });
  }

  return (
    <Button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deletando..." : "Deletar"}
    </Button>
  );
}
