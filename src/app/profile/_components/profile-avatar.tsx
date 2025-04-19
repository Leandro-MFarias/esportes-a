"use client";

import { convertBlobUrlToFile } from "@/lib/utils";
import { deleteImage, uploadImage } from "@/supabase/storage/client";

import { ChangeEvent, useRef, useState, useTransition } from "react";
import { updateUserPicture } from "../../_actions/update-user";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface ProfileAvatarProps {
  userId: string;
  initialPicture: string | null;
  roll: "MUGGLE" | "GOD";
}

export function ProfileAvatar({
  userId,
  initialPicture,
  roll,
}: ProfileAvatarProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialPicture);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const imageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);

      setPreviewUrl(url);
      setIsEditing(true);
    }
  }

  function handleUploadImages() {
    if (!previewUrl) return;

    startTransition(async () => {
      const imageFile = await convertBlobUrlToFile(previewUrl);

      if (imageUrl) {
        const { error: deleteError } = await deleteImage(imageUrl);
        if (deleteError) {
          console.error("Erro ao deletar imagem: ", deleteError);
          return;
        }
      }

      const { imageUrl: updatedImage, error } = await uploadImage({
        file: imageFile,
        bucket: "image-a",
      });
      if (error) {
        console.error("Erro ao fazer upload:", error);
        return;
      }

      try {
        const result = await updateUserPicture(userId, updatedImage);
        if (result.success) {
          setImageUrl(updatedImage);
          setPreviewUrl(null);
          setIsEditing(false);
          router.refresh();
        }
      } catch (error) {
        console.error("Erro updating user picture:", error);
      }
    });
  }

  function cancelEdit() {
    setPreviewUrl(null);
    setIsEditing(false);
  }

  const displayImage = previewUrl || imageUrl || "/profile-null.png";

  return (
    <div>
      <Avatar className="w-48 h-48">
        <AvatarImage src={displayImage} />
      </Avatar>

      <div className="flex items-center justify-center relative">
        <Input
          type="file"
          hidden
          ref={imageInputRef}
          onChange={handleImageChange}
          disabled={isPending}
        />
        <button
          onClick={() => imageInputRef.current?.click()}
          className={`absolute bg-zinc-600 p-2 cursor-pointer rounded-full transition duration-150 hover:bg-zinc-700 hover:scale-105 ${
            roll === "GOD" ? "right-14 bottom-3 " : "right-2 bottom-3"
          }`}
        >
          <PencilIcon className="text-zinc-300" size={16} />
        </button>

        {/* UPLOAD */}
        {isEditing && (
          <div
            className={`absolute flex gap-2 ${
              roll === "GOD" ? "bottom-[11px] -right-[218px]" : "-bottom-14"
            }`}
          >
            <button
              disabled={isPending}
              onClick={handleUploadImages}
              className="border borde-zinc-600 rounded-full w-32 py-2 text-xs cursor-pointer transintion duration-150 hover:bg-zinc-900"
            >
              {isPending ? "Salvando..." : "Salvar"}
            </button>
            <button
              onClick={cancelEdit}
              className="border borde-zinc-600 rounded-full w-32 py-2 text-xs cursor-pointer transintion duration-150 hover:bg-zinc-900"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
