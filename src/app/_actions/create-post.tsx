"use server";

import { PrismaClient } from "@prisma/client";
import { postSchema, PostSchema } from "../_validator/new-post";

const prisma = new PrismaClient();

export async function createPost(
  data: PostSchema & { id?: string; mediaUrl?: string },
  userId: string
) {
  const validatedData = postSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.message,
    };
  }

  const { title, content, category, existingCategory, id, mediaUrl } = validatedData.data;

  let categoryId: string;

  if (existingCategory) {
    categoryId = existingCategory;
  } else if (category) {
    const categoryName = category.trim();

    const existingCategory = await prisma.category.findUnique({
      where: { name: categoryName },
      select: { id: true },
    });

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const newCategory = await prisma.category.create({
        data: {
          name: categoryName,
        },
      });
      categoryId = newCategory.id;
    }
  } else {
    return {
      success: false,
      message: "Categoria necessária",
    };
  }

  let post;

  if (id) {
    post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        categoryId,
        mediaUrl,
        updatedAt: new Date(),
      },
    });
  } else {
    post = await prisma.post.create({
      data: {
        title,
        content,
        categoryId,
        userId,
        mediaUrl,
        updatedAt: new Date(),
      },
    });
  }

  return {
    success: true,
    post: post,
  };
}
