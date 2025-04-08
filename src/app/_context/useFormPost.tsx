"use client"

import { createContext, ReactNode, useContext, useState } from "react";
import { PostSchema } from "../_validator/new-post";

interface PostFormProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  editingPost: Partial<PostSchema> | null
  setEditingPost: (post: Partial<PostSchema> | null) => void
}

const PostFormContext = createContext<PostFormProps | undefined>(undefined);

export function PostFormProvider({ children }: { children: ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<PostSchema> | null>(null);

  return (
    <PostFormContext.Provider value={{ isDialogOpen, setIsDialogOpen, editingPost, setEditingPost }}>
      {children}
    </PostFormContext.Provider>
  );
}

export function usePostForm() {
  const context = useContext(PostFormContext);

  if (!context)
    throw new Error("usePostForm must be used within a PostFormProvider");
  return context;
}
