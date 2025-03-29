"use server";

import { PrismaClient } from "@prisma/client";
import { loginSchema, LoginSchema } from "../_validatiors/register-validators";
import bcrypt from "bcryptjs";
import { createSession } from "../_services/session";

const prisma = new PrismaClient();

export async function signIn(data: LoginSchema) {
  const parseData = loginSchema.safeParse(data);

  if (!parseData.success) {
    return {
      success: false,
      message: parseData.error.message,
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      email: parseData.data.email,
    },
    select: {
      id: true,
      password: true,
    }
  });

  if (!user) {
    return {
      success: false,
      message: "Email não cadastrado",
      type: "email",
    }
  }

  const passwordMatch = await bcrypt.compare(parseData.data.password, user.password);
  if (!passwordMatch) {
    return {
      success: false,
      message: "Senha incorreta",
      type: "password",
    }
  }

  await createSession(user.id)

  return {
    success: true,
  }
}
