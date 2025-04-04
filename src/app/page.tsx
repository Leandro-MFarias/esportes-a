import { PrismaClient } from "@prisma/client";
import { Header } from "./_components/header";
import { Posts } from "./_components/posts";
import { cookies } from "next/headers";
import { decrypt } from "./(auth)/_services/session";
import { NewPost } from "./_components/new-post";
import { NavigationCatagory } from "./_components/navigation-categories";
import { CategoryProvider } from "./_context/useCategoryContext";
import { getCategoriesDataCached } from "@/utils/getposts";

const prisma = new PrismaClient();

export default async function Home() {
  const sessionCookie = (await cookies()).get("session");
  const { categories, noFilteredPosts } = await getCategoriesDataCached()

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

  return (
    <CategoryProvider noFilteredPosts={noFilteredPosts}>
      <div className="px-2 space-y-10 mb-10">
        <Header />
        <section className="mx-auto max-w-[1396px] space-y-10 px-2">
          <div className="flex items-center justify-between">
            {/* NAVBAR */}
            <NavigationCatagory
              categories={categories}
              noFilteredPosts={noFilteredPosts}
            />
            {user && user.role === "GOD" && (
              <NewPost userId={user.id} categories={categories} />
            )}
          </div>

          <Posts />
        </section>
      </div>
    </CategoryProvider>
  );
}
