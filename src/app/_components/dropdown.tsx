"use client"

import { FormButton } from "./form-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string | null;
  category: {
    name: string;
  };
}


interface DropDownMenuProps {
  post: Post
  setPostToDelete: React.Dispatch<React.SetStateAction<string>>;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DropDownMenu({ post, setPostToDelete, setAlertOpen }: DropDownMenuProps) {
  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);

  const { id, title, content, mediaUrl, category } = post

  return (
    <DropdownMenu
      open={openMenuPostId === post.id}
      onOpenChange={(isOpen) => setOpenMenuPostId(isOpen ? post.id : null)}
    >
      <DropdownMenuTrigger className="cursor-pointer">
        <EllipsisVerticalIcon className="text-muted-foreground hover:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setOpenMenuPostId(null)}
          className="py-0"
        >
          <FormButton
            variant={"ghost"}
            postToEdit={{
              id,
              title,
              content,
              mediaUrl,
              category: category.name,
            }}
          >
            Editar post
          </FormButton>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setPostToDelete(post.id);
            setAlertOpen(true);
            setOpenMenuPostId(null);
          }}
          className="cursor-pointer"
        >
          Deletar Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
