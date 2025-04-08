"use client"

import { Button } from "@/components/ui/button";
import { usePostForm } from "../_context/useFormPost";
import { ReactNode } from "react";

interface ButtonProps {
  variant: "default" | "outline" | null | undefined
  type?: string
  children: ReactNode
  postToEdit?: {
    id: string
    title: string;
    content: string;
    existingCategory: string;
  };
}

export function FormButton({ variant, type, postToEdit, children }: ButtonProps) {
  const { setIsDialogOpen, setEditingPost } = usePostForm();
  
  function handleEditingPost() {
    if (postToEdit) {
      setEditingPost(postToEdit)
    } else {
      setEditingPost(null)
    }
    setIsDialogOpen(true)
  }

  return (
    <Button
      variant={variant}
      className={`cursor-pointer ${
        type === "home"
          ? ""
          : "w-[30px] h-7 absolute top-7 right-10 text-muted-foreground"
      }`}
      onClick={handleEditingPost}
    >
      {children}
    </Button>
  );
}
