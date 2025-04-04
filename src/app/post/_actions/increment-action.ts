"use server"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function incrementViewCout(postId: string) {
  await prisma.post.update({
    where: { id: postId },
    data: {
      viewCount: {
        increment: 1,
      }
    }
  })
  return { success: true }
}  