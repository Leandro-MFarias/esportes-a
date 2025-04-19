import { MessageCircleIcon } from "lucide-react";
import { LikeButton } from "./like-button";
import Image from "next/image";

export interface Post {
  id: string;
  title: string;
  content: string;
  mediaUrl: string | null;
  likeCount: number;
  createdAt: Date;
  category: { name: string };
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
    <section className="flex flex-col border border-zinc-800 max-w-6xl py-5 px-8 mx-auto space-y-4">
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
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
          {post.title}
        </h1>
        <p className="pl-3 text-muted-foreground">{post.category.name}</p>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col space-y-4">
        <p className="whitespace-pre-wrap">{post.content}</p>
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
