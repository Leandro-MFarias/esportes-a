import { Header } from "@/app/_components/header";
import { getCategoriesDataCached, getPostDataCached } from "@/utils/getposts";
import { HeartIcon, MessageCircleIcon } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { categories } = await getCategoriesDataCached();
  return categories.map(({ id }) => ({ id }));
}

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostDataCached(id);

  if (!post) {
    return { title: "Post não encontrado" };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 160),
  };
}

export default async function PostPage({ params }: ParamsProps) {
  const { id } = await params;
  const post = await getPostDataCached(id);
  if (!post) return notFound();

  return (
    <div className="px-2 space-y-10">
      <Header />
      <section className="border border-zinc-800 max-w-6xl py-5 px-8 mx-auto space-y-4">
        {/* QUEM E QUANDO */}
        <div className="flex space-x-2 text-muted-foreground text-sm pl-2">
          <p>{post.User.userName}</p>
          <span className="text-zinc-400">|</span>
          <p>
            {new Intl.DateTimeFormat("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(post.createdAt))}
          </p>
        </div>

        {/* TITLE E CATEGORY */}
        <div>
          <h1 className="text-6xl font-bold">{post.title}</h1>
          <p className="pl-3 text-muted-foreground">{post.category.name}</p>
        </div>

        {/* CONTENT */}
        <p className="whitespace-pre-wrap">{post.content}</p>

        {/* LIKES COMENTARIOS E VIEWS */}
        <div className="w-full h-[1px] bg-zinc-800" />
        <div className="flex items-center gap-6">
          <div className="flex space-x-2">
            <HeartIcon />
            <p>{post.likeCount} curtidas</p>
          </div>
          <div className="flex space-x-2">
            <MessageCircleIcon />
            <p>{post.Comments.length} comentário</p>
          </div>
        </div>
      </section>
    </div>
  );
}
