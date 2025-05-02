import { EditProfile } from "../_components/edit-profile";
import { ProfileAvatar } from "@/app/profile/_components/profile-avatar";
import { PrismaClient } from "@prisma/client";
import { Header } from "@/app/_components/header";

type ParamsProps = {
  params: Promise<{ id: string }>
}

const prisma = new PrismaClient();

export default async function ProfilePage({ params }: ParamsProps) {
  const { id } =  await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        userName: true,
        picture: true,
        email: true,
        role: true,
      },
    });
    if (!user) return;

    return (
      <div className="space-y-4">
        <Header />
        <section
          key={id}
          className="flex flex-col border border-zinc-600 max-w-5xl mx-auto rounded-xl p-5 space-y-5"
        >
          {/* AVATAR */}
          <div className="relative w-60">
            <ProfileAvatar
              userId={id}
              initialPicture={user?.picture || null}
            />
          </div>

          {/* INPUTS */}
          <EditProfile user={user} />
        </section>
      </div>
    );
  } catch (error) {
    console.error("Erro profile", error);
    return <div>Alguma coisa deu errado, tente novamente mais tarde 😓</div>;
  }
}
