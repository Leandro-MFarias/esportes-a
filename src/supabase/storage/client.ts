import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createSupabaseClient } from "../client";

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

interface UploadProps {
  file: File;
  bucket: string;
  folder?: string;
}

export async function uploadImage({ file, bucket, folder }: UploadProps) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 7,
    });
  } catch (error) {
    console.error(error);
    return { imageUrl: "", error: "Image compression failed" };
  }

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    return { imageUrl: "", error: "Image upload failed" };
  }

  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${
    data?.path
  }`;

  return { imageUrl, error: "" };
}

export const deleteImage = async (imageUrl: string) => {
  try {
    const bucketAndPathString = imageUrl.split("/storage/v1/object/public/")[1];

    if (!bucketAndPathString) {
      console.error("Invalid image URL format: ", imageUrl);
      return { data: null, error: { message: "Invalid image URL format" } };
    }

    const firstSlashIndex = bucketAndPathString.indexOf("/");

    if (firstSlashIndex === -1) {
      console.error("Cannot parse bucket and path from URL:", imageUrl);
      return { data: null, error: { message: "Cannot parse bucket and path" } };
    }

    const bucket = bucketAndPathString.slice(0, firstSlashIndex);
    const path = bucketAndPathString.slice(firstSlashIndex + 1);

    console.log("Deleting from bucket: ", bucket, "path", path)

    const storage = getStorage()
    const result = await storage.from(bucket).remove([path])

    console.log("Delete result:", result);

    return result
  } catch (error) {
    console.error("Error in deleteImage: ", error)
    return {
      data: null,
      error: {
        message: error instanceof Error ? error.message : "Unknown error during image deletion",
      }
    }
  }
};
