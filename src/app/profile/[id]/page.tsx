import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { PrismaClient } from "@prisma/client";
import { PencilIcon } from "lucide-react";
interface PageProps {
  params: {
    id: string;
  };
}

const prisma = new PrismaClient();

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;
  let user = null;

  try {
    user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        userName: true,
        picture: true,
        email: true,
      },
    });
  } catch (error) {
    console.error("Erro profile", error);
  }

  return (
    <section
      key={id}
      className="border border-zinc-600 max-w-5xl mx-auto rounded-xl p-5 space-y-5"
    >
      <div className="relative w-60">
        <Avatar className="w-48 h-48">
          <AvatarImage
            src={`${
              user?.picture === null ? "/profile-null.png" : user?.picture
            }`}
          />
        </Avatar>
        <div className="flex items-center justify-center absolute right-12 bottom-2 bg-zinc-900 rounded-full w-10 h-10">
          <PencilIcon className="text-white" />
        </div>
      </div>

      <div className="flex justify-around">
        <div>
          <label htmlFor="">Seu nome</label>
          <Input placeholder={user?.userName} />
        </div>
        <div>
          <label htmlFor="">Seu email</label>
          <Input placeholder={user?.email} />
        </div>
      </div>
    </section>
  );
}
