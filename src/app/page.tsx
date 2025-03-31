import { PrismaClient } from "@prisma/client";
import { Header } from "./_components/header";
import { Posts } from "./_components/posts";
import { cookies } from "next/headers";
import { decrypt } from "./(auth)/_services/session";
import { NewPost } from "./_components/new-post";
import { NavigationCatagory } from "./_components/navigation-categories";
import { CategoryProvider } from "./_context/useCategoryContext";

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
    include: {
      Posts: {
        select: {
          id: true,
          title: true,
          content: true,
          likeCount: true,
          viewCount: true,
          category: {
            select: {
              name: true,
            }
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  const noFilteredPosts = categories.flatMap((category) => category.Posts);


  return (
    <CategoryProvider noFilteredPosts={noFilteredPosts}>
      <div className="px-2 space-y-10">
        <Header />
        <section className="mx-auto max-w-[1396px] space-y-10 px-2">
          <div className="flex justify-between">
            {/* NAVBAR */}
            <NavigationCatagory categories={categories} noFilteredPosts={noFilteredPosts} />
            {user && user.role === "GOD" && (
              <NewPost userId={user.id} categories={categories} />
            )}
          </div>

          <div className="flex flex-wrap gap-8">
            <Posts />
          </div>
        </section>
      </div>
    </CategoryProvider>
  );
}
