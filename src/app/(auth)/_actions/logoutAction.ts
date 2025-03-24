"use server"

import { redirect } from "next/navigation"
import { deleteSession } from "../_services/session"

export async function logout() {
  await deleteSession()
  redirect("/login")
}