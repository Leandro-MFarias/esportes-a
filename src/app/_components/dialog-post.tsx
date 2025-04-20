"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostForm } from "./post-form";
import { Category } from "@prisma/client";

import { usePostForm } from "../_context/useFormPost";

interface DialogProps {
  userId: string
  categories: Category[];
}

export function DialogPost({ userId, categories }: DialogProps) {
  const { isDialogOpen, setIsDialogOpen, editingPost } = usePostForm()

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-full sm:min-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {editingPost?.id ? "Editar Post" : "Criar Post"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PostForm
          userId={userId}
          categories={categories}
          onClose={() => setIsDialogOpen(false)}
          defaultValue={editingPost}
        />
      </DialogContent>
    </Dialog>
  );
}
