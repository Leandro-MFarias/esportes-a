"use client";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { createPost } from "../_actions/create-post";
import { postSchema, PostSchema } from "../_validator/new-post";
import { Category } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PostFormProps {
  userId: string;
  categories: Category[];
  onClose: () => void;
}

export function PostForm({ userId, categories, onClose }: PostFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
  });

  const existingCategory = watch("existingCategory");

  async function handleForm(data: PostSchema) {
    try {
      const result = await createPost(data, userId);
      console.log(result);
      if (result?.success) {
        toast.success("Post Criado com sucesso.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Ocorreu um erro ao criar o post");
    } finally {
      onClose();
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
      <div className="flex gap-4">
        <div>
          <Input
            placeholder="Title"
            className="max-w-2xs"
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="text-red-600 text-sm font-bold">
              {errors.title.message}
            </p>
          )}
        </div>
        <Select
          onValueChange={(value) =>
            setValue("existingCategory", value, { shouldValidate: true })
          }
          value={existingCategory}
        >
          <SelectTrigger className="w-[288px]">
            <SelectValue placeholder="Existing category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          className="max-w-2xs"
          placeholder="New Category"
          {...register("category")}
        />
        {errors.existingCategory?.message && (
          <p className="text-red-600 text-sm font-bold">
            {errors.existingCategory.message}
          </p>
        )}
      </div>
      <div>
        <Textarea placeholder="Content" {...register("content")} />
        {errors.content?.message && (
          <p className="text-red-600 text-sm font-bold">
            {errors.content.message}
          </p>
        )}
      </div>

      <DialogFooter>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
          className="w-40 py-5 cursor-pointer"
        >
          {isSubmitting ? "Criando..." : "Criar Post"}
        </Button>
      </DialogFooter>
    </form>
  );
}
