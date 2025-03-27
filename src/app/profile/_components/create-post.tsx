import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import { PrismaClient } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { PostForm } from "./post-form";

// const prisma = new PrismaClient()

export function NewPost() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="self-end flex items-center text-zinc-600 hover:text-white transition duration-150 ease-in gap-1 cursor-pointer">
          Novo Post
          <PlusIcon size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <PostForm />
      </DialogContent>
    </Dialog>
  );
}
