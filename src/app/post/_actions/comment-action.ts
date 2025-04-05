"use server";

import { cookies } from "next/headers";
import { CommentSchema } from "../_validator/comments";
import { decrypt } from "@/app/(auth)/_services/session";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createComment(
  data: CommentSchema
) {
  const sessionCookies = (await cookies()).get("session");

  if (!sessionCookies) {
    return {
      success: false,
      message: "Você precisa estar logado para comentar",
    };
  }

  try {
    const payload = await decrypt(sessionCookies.value);

    if (!payload) {
      return { success: false, message: "Sessão inválida" };
    }

    const userId = payload.userId as string;

    const comment = await prisma.comment.create({
      data: {
        userId,
        content: data.content,
        postId: data.postId,
        updatedAt: new Date()
      },
      include: {
        User: {
          select: {
            userName: true,
            picture: true,
          },
        },
      },
    });

    revalidatePath(`/post/${data.postId}`);

    return { success: true, comment};
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao criar comentário" };
  }
}
