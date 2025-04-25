"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function deletePost(postId: string) {
  if (postId) {
    await prisma.post.delete({
      where: { id: postId }
    })
  }

  revalidatePath("/")

  return { success: true, message: "Post Deletado com sucesso!" }
} 