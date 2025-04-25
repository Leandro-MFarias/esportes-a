"use client"

import { Button } from "@/components/ui/button";
import { usePostForm } from "../_context/useFormPost";
import { ReactNode } from "react";

interface ButtonProps {
  variant: "default" | "outline" | "ghost" | null | undefined
  type?: string
  children: ReactNode
  postToEdit?: {
    id: string
    title: string;
    content: string;
    mediaUrl: string;
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
          : "p-0 gap-y-0"
      }`}
      onClick={handleEditingPost}
    >
      {children}
    </Button>
  );
}
