import { PrismaClient } from "@prisma/client";
import { Header } from "./_components/header";
import { Posts } from "./_components/posts";
import { cookies } from "next/headers";
import { decrypt } from "./(auth)/_services/session";
import { NewPost } from "./_components/new-post";

const prisma = new PrismaClient();

export default async function Home() {
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
            role: true,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-10">
      <Header />
      <section className="mx-auto max-w-7xl space-y-10">
        <div className="flex justify-between">
          <nav className="pl-2 flex items-center">
            <ul className="flex gap-4 font-bold text-muted-foreground">
              <li>Todos os Posts</li>
              <li>Futebol</li>
              <li>Basquete</li>
              <li>Fórmula 1</li>
              <li>Geral</li>
            </ul>
          </nav>
          {user && user.role === "GOD" && (
            <NewPost userId={user.id} categories={categories} />
          )}
        </div>

        <div className="flex flex-wrap gap-8 justify-center">
          <Posts />
        </div>
      </section>
    </div>
  );
}
