"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

export function PostForm() {
  const { register, handleSubmit } = useForm();

  function handleForm(data: any) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} className="space-y-3">
      <Input placeholder="Title" className="max-w-2xs" {...register("title")} />
      <Textarea placeholder="Content" {...register("content")} />

      <DialogFooter>
        <Button
          type="submit"
          variant="outline"
          className="w-40 py-5 cursor-pointer"
        >
          Criar Post
        </Button>
      </DialogFooter>
    </form>
  );
}
