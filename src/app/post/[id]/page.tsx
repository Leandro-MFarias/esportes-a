import { Header } from "@/app/_components/header";

import { getPostDataCached } from "@/utils/getposts";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostContent } from "../_components/post-content";
import { Comments } from "../_components/comments";
import { incrementViewCout } from "../_actions/increment-action";

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
  const { id } = await params;
  const post = await getPostDataCached(id);
  if (!post) return notFound();

  await incrementViewCout(post.id);

  return (
    <div className="px-2 space-y-10">
      <Header />

      {/* POST */}
      <PostContent post={post} />

      {/* COMMENTS */}
      <Comments postId={id} initialComments={post.Comments} />
    </div>
  );
}
