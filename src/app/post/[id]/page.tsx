import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

interface PostProps {
  params: {
    id: string;
  };
}

const prisma = new PrismaClient();

export default async function Post({ params }: PostProps) {
  const { id } = await params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        title: true,
        content: true,
        likeCount: true,
        createdAt: true,
        category: {
          select: {
            name: true,
          },
        },
        Comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            User: {
              select: {
                id: true,
                userName: true,
                picture: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        User: {
          select: {
            userName: true,
            picture: true,
          },
        },
      },
    });
    if (!post) return notFound();

    return (
      <section>
        <h1>{post.title}</h1>
        <p>{post.category.name}</p>
        <p>{post.User.userName}</p>
        <p>{post.content}</p>
        <p>
          {new Intl.DateTimeFormat("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }).format(new Date(post.createdAt))}
        </p>
      </section>
    );
  } catch (error) {
    console.error(error);
  }
}
