"use server";

import { PrismaClient } from "@prisma/client";
import { changeSchema, ChangeSchema } from "../profile/_validator/change-user";

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

export async function updateUserProfile(userId: string, data: ChangeSchema) {
  const validatedData = changeSchema.safeParse(data);

  if (!validatedData.success) {
    return {
      success: false,
      message: validatedData.error.message,
    };
  }

  try {
    const updateData: { userName?: string; email?: string } = {};

    if (validatedData.data.userName) {
      updateData.userName = validatedData.data.userName;
    }

    if (validatedData.data.email) {
      updateData.email = validatedData.data.email;
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: false,
        message: "Preencha um campo para atualizar informações",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        userName: true,
        email: true,
      },
    });

    return {
      success: true,
      user: updatedUser
    };
  } catch (error) {
    console.error("Erro ao mudar o username:", error);
  }
}
