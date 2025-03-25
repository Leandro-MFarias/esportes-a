"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateUserPicture(userId: string, pictureUrl: string) {
  try {
    if (!userId || !pictureUrl) {
      throw new Error("User ID and picture URL are required");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { picture: pictureUrl },
    });

    return { success: true, user: updatedUser };
  } catch {
    throw new Error("Failed to update user picture:");
  }
}
