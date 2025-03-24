"use client"

import { logout } from "../(auth)/_actions/logoutAction"

export function LogoutButton() {
  
  async function handlelogout() {
    return await logout()
  }

  return (
    <button
      onClick={handlelogout}
      className="cursor-pointer hover:text-violet-600 transition duration-150 ease-in"
    >
      Sair
    </button>
  )
}