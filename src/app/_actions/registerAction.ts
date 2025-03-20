'use server'

import { PrismaClient } from "@prisma/client"
import { registerSchema, RegisterSchema } from "../_validatiors/register-validators"

export async function createAccount(data: RegisterSchema) {
  const parsedData = registerSchema.safeParse(data)

  if (!parsedData.success) {
    throw new Error(parsedData.error.message)
  }

  const prisma = new PrismaClient()

  await prisma.user.create({
    data: {
      userName: parsedData.data.username,
      email: parsedData.data.email,
      password: parsedData.data.password,
    }
  })
}