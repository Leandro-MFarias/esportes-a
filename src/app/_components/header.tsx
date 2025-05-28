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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { EditProfile } from "../profile/_components/edit-profile";
import { ProfileAvatar } from "../profile/_components/profile-avatar";
import Image from "next/image";

const prisma = new PrismaClient();

export async function Header() {
  const sessionCookie = (await cookies()).get("session");
  let user = null;

  if (sessionCookie) {
    try {
      const payload = await decrypt(sessionCookie.value);

      if (payload && payload.userId) {
        user = await prisma.user.findUnique({
          where: { id: payload.userId as string },
          select: {
            id: true,
            userName: true,
            email: true,
            picture: true,
            role: true,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <Sheet>
      <Menubar className="px-4 mt-2 border-2 border-zinc-800 justify-between">
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="/" className="text-xl text-lime-500 font-bold">
              <Image src="/orange.png" width={200} height={180} alt="logo" />
            </Link>
          </MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>
            {user ? (
              <div className="flex gap-2 cursor-pointer">
                <Avatar>
                  <AvatarImage
                    src={`${
                      user.picture === null ? "/profile-null.png" : user.picture
                    }`}
                  />
                </Avatar>

                <p className="text-lg font-semibold">{user.userName}</p>
              </div>
            ) : (
              <Link href="/login">Fazer login</Link>
            )}
          </MenubarTrigger>
          {user && (
            <MenubarContent className="w-36">
              <MenubarItem>
                <SheetTrigger className="text-base cursor-pointer hover:text-lime-500 transition duration-150 ease-in">
                  Perfil
                </SheetTrigger>
              </MenubarItem>
              <MenubarItem>
                <LogoutButton />
              </MenubarItem>
            </MenubarContent>
          )}
        </MenubarMenu>
      </Menubar>
      {user && (
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Editar Perfil</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="px-3 h-screen flex flex-col items-center space-y-20">
            <ProfileAvatar
              userId={user.id}
              initialPicture={user?.picture || null}
            />
            <EditProfile user={user} />
          </div>
        </SheetContent>
      )}
    </Sheet>
  );
}
