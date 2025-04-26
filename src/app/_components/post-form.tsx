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
import { useEffect, useState } from "react";
import { deleteImage, uploadImage } from "@/supabase/storage/client";
import Image from "next/image";

interface PostFormProps {
  userId: string;
  categories: Category[];
  onClose: () => void;
  defaultValue?: (Partial<PostSchema> & { id?: string }) | null;
}

export function PostForm({
  userId,
  categories,
  onClose,
  defaultValue,
}: PostFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: defaultValue ?? {
      title: "",
      category: "",
      existingCategory: "",
      content: "",
      mediaUrl: "",
    },
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (defaultValue?.mediaUrl) {
      setPreviewUrl(defaultValue?.mediaUrl)
    }
  }, [defaultValue?.mediaUrl])

  function handleShowImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  }

  async function handleForm(data: PostSchema) {
    try {
      let mediaUrl = defaultValue?.mediaUrl;
      const fileList = data.mediaUrl;
      const file = fileList?.[0];

      if (file instanceof File && file.size > 0) {
        // Se existe um novo arquivo, aí sim:
        if (defaultValue?.mediaUrl) {
          console.log("Deletando imagem anterior: ", defaultValue.mediaUrl);
  
          const bucketAndPathString = defaultValue.mediaUrl.split(
            "/storage/v1/object/public/"
          )[1];
          if (bucketAndPathString) {
            const firstSlashIndex = bucketAndPathString.indexOf("/");
            const bucket = bucketAndPathString.slice(0, firstSlashIndex);
            const path = bucketAndPathString.slice(firstSlashIndex + 1);
  
            console.log("Deleting from bucket:", bucket, "path:", path);
  
            const { error: deleteError } = await deleteImage(
              defaultValue.mediaUrl
            );
  
            if (deleteError) {
              console.error("Erro ao deletar imagem:", deleteError.message);
              toast.error("Erro ao deletar imagem antiga.");
              return; // se erro ao deletar, melhor abortar
            } else {
              console.log("Imagem anterior deletada com sucesso");
            }
          } else {
            console.error("URL da imagem inválida:", defaultValue.mediaUrl);
            return; // também aborta se URL inválida
          }
        }
  
        // Agora sim faz upload da nova imagem
        const { imageUrl, error } = await uploadImage({
          file,
          bucket: "image-a",
          folder: "posts",
        });
  
        if (error) {
          toast.error("Erro ao fazer o upload da imagem.");
          return;
        }
  
        mediaUrl = imageUrl;
      }
  
      // Só chega aqui depois de tudo certo
      const result = await createPost(
        { ...data, id: defaultValue?.id, mediaUrl },
        userId
      );
  
      if (result?.success) {
        toast.success(
          defaultValue?.id
            ? "Post atualizado com sucesso!"
            : "Post Criado com sucesso."
        );
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
          value={defaultValue?.existingCategory}
          onValueChange={(value) =>
            setValue("existingCategory", value, { shouldValidate: true })
          }
        >
          <SelectTrigger className="min-w-[164px]">
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
        <Textarea
          placeholder="Content"
          {...register("content")}
          className="sm:min-h-80"
        />
        {errors.content?.message && (
          <p className="text-red-600 text-sm font-bold">
            {errors.content.message}
          </p>
        )}
      </div>
      <div className="relative space-y-4">
        <Input
          type="file"
          accept="image/*,video/*"
          className="z-50 absolute opacity-0 cursor-pointer"
          {...register("mediaUrl")}
          onChange={handleShowImage}
        />
        <Button type="button" className="-z-10 inset-0 w-full">
          Escolher Imagem
        </Button>

        {previewUrl && (
          <Image
            src={previewUrl}
            width={128}
            height={128}
            alt="Prévia da imagem"
            className="rounded-md w-auto max-h-28 object-contain"
          />
        )}
      </div>

      <DialogFooter>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="outline"
          className="w-40 py-5 cursor-pointer"
        >
          {isSubmitting
            ? "Salvando..."
            : defaultValue?.id
            ? "Atualizar Post"
            : "Criar Post"}
        </Button>
      </DialogFooter>
    </form>
  );
}
