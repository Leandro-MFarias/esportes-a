"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

export function Form() {
  const { register, handleSubmit } = useForm();

  function handleForm() {
    
  }

  return (
    <form onSubmit={handleSubmit(handleForm)}>
      <Input
        type="text"
        placeholder="Adicionar um comentário"
        {...register("comment")}
      />
    </form>
  );
}
