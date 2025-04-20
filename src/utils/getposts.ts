import { PrismaClient } from "@prisma/client";
import { cache } from "react";

const prisma = new PrismaClient();

export async function getPostData(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      mediaUrl: true,
      viewCount: true,
      likeCount: true,
      createdAt: true,
      category: {
        select: {
          name: true,
        },
      },
      Comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          User: {
            select: {
              id: true,
              userName: true,
              picture: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      User: {
        select: {
          userName: true,
          picture: true,
        },
      },
    },
  });
}

export async function getCategoriesData() {
  const categories = await prisma.category.findMany({
    include: {
      Posts: {
        select: {
          id: true,
          title: true,
          content: true,
          mediaUrl: true,
          likeCount: true,
          viewCount: true,
          createdAt: true,
          category: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const recent = categories.map((category) => {
    if (category.Posts.length === 0) return null;

    return {
      ...category.Posts[0],
      categoryId: category.id,
      categoryName: category.name,
    };
  }).filter(post => post !== null)

  return {
    categories,
    recent,
  };
}

export const getPostDataCached = cache(getPostData);
export const getCategoriesDataCached = cache(getCategoriesData);
