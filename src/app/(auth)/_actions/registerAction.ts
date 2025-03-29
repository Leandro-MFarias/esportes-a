"use server";

import { PrismaClient } from "@prisma/client";
import {
  registerSchema,
  RegisterSchema,
} from "../_validatiors/register-validators";
import bcrypt from "bcryptjs";
import { createSession } from "../_services/session";

const prisma = new PrismaClient();

export async function createAccount(data: RegisterSchema) {
  const parsedData = registerSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.message,
    };
  }

  const hashPassword = await bcrypt.hash(parsedData.data.password, 10);

  const user = await prisma.user.create({
    data: {
      userName: parsedData.data.username,
      email: parsedData.data.email,
      password: hashPassword,
      role: "MUGGLE",
    },
    select: {
      id: true,
    },
  });

  await createSession(user.id)

  return {
    success: true
  }
}