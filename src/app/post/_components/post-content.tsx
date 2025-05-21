import { MessageCircleIcon } from "lucide-react";
import { LikeButton } from "./like-button";
import Image from "next/image";
import { parseContent } from "@/utils/parseContent";
import { CategoryColor } from "@/app/_components/category-colors";

export interface Post {
  id: string;
  title: string;
  content: string;
  mediaUrl: string | null;
  likeCount: number;
  createdAt: Date;
  category: {
    name: string;
    color: string | null;
  };
  Comments: {
    id: string;
    content: string;
    createdAt: Date;
    User: { id: string; userName: string; picture: string | null };
  }[];
  User: { userName: string; picture: string | null };
}

interface PostProps {
  post: Post;
}

export function PostContent({ post }: PostProps) {
  return (
    <section className="flex flex-col border border-zinc-800 max-w-6xl py-5 px-8 mx-auto space-y-4 rounded-xl">
      {/* QUEM E QUANDO */}
      <div className="self-end flex space-x-2 text-muted-foreground text-sm pl-2">
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
      <div className="space-y-2">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          {post.title}
        </h1>

        <CategoryColor category={post.category} />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col space-y-4">
        <div className="whitespace-pre-wrap text-white/80">
          {parseContent(post.content)}
        </div>
        {post.mediaUrl && (
          <Image
            src={post.mediaUrl}
            alt={post.title}
            width={860}
            height={740}
            className="self-center rounded-lg border border-zinc-800"
          />
        )}
      </div>

      <div className="w-full h-[1px] bg-zinc-800" />

      {/* LIKES COMENTARIOS E VIEWS */}
      <div className="flex items-center gap-6">
        <div className="flex space-x-2">
          <LikeButton postId={post.id} initialLikeCount={post.likeCount} />
        </div>
        <div className="flex space-x-2">
          <MessageCircleIcon />
          <p>{post.Comments.length} comentário</p>
        </div>
      </div>
    </section>
  );
}
