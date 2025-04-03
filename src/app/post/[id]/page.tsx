import { Header } from "@/app/_components/header";

import { getPostDataCached } from "@/utils/getposts";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostSection } from "../_components/postSection";
import { Comments } from "../_components/comments";

type ParamsProps = {
  params: Promise<{ id: string }>;
};

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
  const resolved = (await params).id;
  const post = await getPostDataCached(resolved);
  if (!post) return notFound();

  return (
    <div className="px-2 space-y-10">
      <Header />

      {/* POST */}
      <PostSection post={post} />

      {/* COMMENTS */}
      <Comments />
    </div>
  );
}
