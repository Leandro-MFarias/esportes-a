"use server";

import { PrismaClient } from "@prisma/client";
import { postSchema, PostSchema } from "../_validator/new-post";

const prisma = new PrismaClient();

export async function createPost(data: PostSchema, userId: string) {
  const validatedData = postSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.message,
    };
  }

  let categoryId: string;

  if (validatedData.data.existingCategory) {
    categoryId = validatedData.data.existingCategory;
  } else if (validatedData.data.category) {
    const categoryName = validatedData.data.category.trim();

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

  const createPost = await prisma.post.create({
    data: {
      title: validatedData.data.title,
      content: validatedData.data.content,
      userId: userId,
      categoryId: categoryId,
      updatedAt: new Date(),
    },
  });

  return { 
    success: true,
    post: createPost
  }
}
