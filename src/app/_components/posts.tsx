import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PrismaClient } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

export async function Posts() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      content: true,
      title: true,
      category: true,
    },
  });

  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} className="w-[484px]">
          <Link href={`/post/${post.id}`}>
            <CardHeader>
              <CardTitle className="text-3xl">
                {post.title}
                {post.category.name}
              </CardTitle>
              <CardDescription>Futebol</CardDescription>
            </CardHeader>
            <CardContent className="leading-7 line-clamp-4">
              {post.content}
            </CardContent>
          </Link>
          <CardFooter className="flex flex-col space-y-4">
            <div className="h-[1px] w-full bg-zinc-600" />
            <div className="flex justify-between w-full">
              <HeartIcon />
              <div className="flex space-x-6">
                <p>0 comentário</p>
                <p>0 visualização</p>
                <p></p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
