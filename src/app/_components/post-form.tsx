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
import { useRef } from "react";
import { deleteImage, uploadImage } from "@/supabase/storage/client";

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
    watch,
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
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const existingCategory = watch("existingCategory");
  function getFilenameFromUrl(url: string) {
    if (!url) return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  }

  const currentImageName = defaultValue?.mediaUrl
    ? getFilenameFromUrl(defaultValue.mediaUrl)
    : "";

  async function handleForm(data: PostSchema) {
    try {
      let mediaUrl = defaultValue?.mediaUrl || "";
      const fileList = data.mediaUrl;
      const file = fileList?.[0];

      if (file && defaultValue?.mediaUrl) {
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
          } else {
            console.log("Imagem anterior deletada com sucesso");
          }
        } else {
          console.error("URL da imagem inválida:", defaultValue.mediaUrl);
        }
      }

      if (file) {
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
          onValueChange={(value) =>
            setValue("existingCategory", value, { shouldValidate: true })
          }
          value={existingCategory}
        >
          <SelectTrigger>
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
      <div>
        <Input
          type="file"
          accept="image/*,video/*"
          className="hidden"
          {...register("mediaUrl")}
          ref={(e) => {
            register("mediaUrl").ref(e);
            imageInputRef.current = e;
          }}
        />

        <Button type="button" onClick={() => imageInputRef.current?.click()}>
          Escolher Imagem
        </Button>
        {defaultValue?.mediaUrl && !watch("mediaUrl")?.[0] && (
          <p className="text-sm text-muted-foreground">
            Imagem atual: {currentImageName}
          </p>
        )}

        {/* Display new selected file name */}
        {watch("mediaUrl") && watch("mediaUrl")[0] && (
          <p className="text-sm text-muted-foreground">
            Novo arquivo selecionado: {watch("mediaUrl")[0].name}
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
