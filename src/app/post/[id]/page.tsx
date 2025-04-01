import { getCategoriesDataCached, getPostDataCached } from "@/utils/getposts";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { categories } = await getCategoriesDataCached();
  return categories.map(({ id }) => id);
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const { id } = params;
  const post = await getPostDataCached(id);

  if (!post) {
    return { title: "Post não encontrado" };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
  };
}

interface PostProps {
  params: {
    id: string;
  };
}

export default async function Post({ params }: PostProps) {
  const { id } = await params;
  const post = await getPostDataCached(id);
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
}
