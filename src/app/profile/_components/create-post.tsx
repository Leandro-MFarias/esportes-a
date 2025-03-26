import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PrismaClient } from "@prisma/client";
import { PlusIcon } from "lucide-react";

const prisma = new PrismaClient()

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

        <div className="space-y-3">
          <Input placeholder="Title" className="max-w-2xs" />
          <Textarea placeholder="Content" />
        </div>
        <DialogFooter>
          <Button variant="outline" className="w-40 py-5 cursor-pointer">
            Criar Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
