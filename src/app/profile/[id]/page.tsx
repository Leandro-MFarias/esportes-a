import { ProfileAvatar } from "@/app/_components/profile-avatar";
import { Input } from "@/components/ui/input";
import { PrismaClient } from "@prisma/client";
interface PageProps {
  params: {
    id: string;
  };
}

const prisma = new PrismaClient();

export default async function ProfilePage({ params }: PageProps) {
  const { id } = await params;

  let user;

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
      {/* AVATAR */}
      <div className="relative w-60">
          <ProfileAvatar userId={id} initialPicture={user?.picture || null} />
      </div>

      {/* INPUTS */}
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
