"use server";

import { decrypt } from "@/app/(auth)/_services/session";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ToggleLikeResult =
  | { success: true; liked: boolean }
  | { success: false; message?: string };


const prisma = new PrismaClient();

export async function toggleLike(postId: string): Promise<ToggleLikeResult> {
  const sessionCookie = (await cookies()).get("session");

  if (!sessionCookie) {
    return {
      success: false,
      message: "Você precisa estar logado para curtir um post",
    };
  }

  try {
    const payload = await decrypt(sessionCookie.value);

    if (!payload) {
      return { success: false, message: "Sessã inválida" };
    }

    const userId = payload.userId as string;
  
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return { success: false, message: "Usuário não encontrado" }
    }

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await prisma.$transaction([
        // Delete Like
        prisma.like.delete({
          where: { id: existingLike.id },
        }),

        // Decrement the post Like
        prisma.post.update({
          where: { id: postId },
          data: { likeCount: { decrement: 1 } },
        }),

        // Decrement the user Like
        prisma.user.update({
          where: { id: userId },
          data: { likedPostCount: { decrement: 1 } },
        }),
      ]);

      revalidatePath(`/post/${postId}`);
      revalidatePath("/");

      return { success: true, liked: false };
    } else {
      await prisma.$transaction([
        // Create the like
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),

        // Increment post Like
        prisma.post.update({
          where: { id: postId },
          data: { likeCount: { increment: 1 } },
        }),

        // Increment user like
        prisma.user.update({
          where: { id: userId },
          data: { likedPostCount: { increment: 1 } },
        }),
      ]);

      revalidatePath(`/post/${postId}`);
      revalidatePath("/");
      return { success: true, liked: true };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao processar sua curtida" };
  }
}

export async function checkUserLikedPost(postId: string) {
  const sessionCookie = (await cookies()).get("session")

  if (!sessionCookie) {
    return { isLiked: false, isLoggedIn: false }
  }

  try {
    const payload = await decrypt(sessionCookie.value)

    if (!payload) {
      return { isLiked: false, isLoggedIn: false }
    }

    const userId = payload.userId as string

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId
        }
      }
    })

    return { isLiked: !!existingLike, isLoggedIn: true }
  } catch (error) {
    console.error(error)
    return { isLiked: false, isLoggedIn: false }
  }
}
