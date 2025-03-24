import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { decrypt } from "../(auth)/_services/session";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const prisma = new PrismaClient();

export async function NavBar() {
  const sessionCookie = (await cookies()).get("session");
  let user = null;

  if (sessionCookie) {
    try {
      const payload = await decrypt(sessionCookie.value);

      if (payload && payload.userId) {
        user = await prisma.user.findUnique({
          where: { id: payload.userId as string },
          select: {
            userName: true,
            picture: true,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <Menubar className="m-2 border-zinc-600 justify-between px-4">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href="/" className="text-xl font-bold">
            BLOG
          </Link>
        </MenubarTrigger>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>
          {user ? (
            <div className="flex gap-2 cursor-pointer">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>

              <p className="text-lg font-semibold">{user.userName}</p>
            </div>
          ) : (
            <Link href="/login">Fazer login</Link>
          )}
        </MenubarTrigger>
        {user && (
          <MenubarContent>
            <MenubarItem>
              <Link
                className="hover:text-violet-600 transition duration-150 ease-in"
                href="/profile"
              >
                Editar perfil
              </Link>
            </MenubarItem>
            <MenubarItem>
              <LogoutButton />
            </MenubarItem>
          </MenubarContent>
        )}
      </MenubarMenu>
    </Menubar>
  );
}
