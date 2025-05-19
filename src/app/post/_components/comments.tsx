"use client";

import { Avatar } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AvatarImage } from "@/components/ui/avatar";
import { CommentForm } from "./comment-form";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
import { useState } from "react";

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  User: {
    userName: string;
    picture: string | null;
  };
}

interface CommentsProps {
  postId: string;
  initialComments: Comment[];
}

export function Comments({ postId, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  function handleCommentAdded(newComment: Comment) {
    setComments((prev) => [newComment, ...prev]);
  }

  return (
    <section className="border border-zinc-800 max-w-6xl py-5  px-8 mx-auto mb-10 space-y-6 rounded-xl">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold">Comentários</h2>
        <CommentForm postId={postId} commentAdded={handleCommentAdded} />
        <div className="w-full h-[1px] bg-zinc-800" />
      </div>

      {/* ONDE CHEGA OS COMENTARIOS */}
      <ScrollArea type="always" className="h-96 pr-4">
        {/* UNICA */}
        {comments.length === 0 ? (
          <p className="text-center text-zinc-500">
            Nenhum comentário ainda. Seja o primeiro a comentar!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex flex-col pb-8">
              <div className="flex flex-col space-y-0.5">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        comment.User.picture === null
                          ? "/profile-null.png"
                          : comment.User.picture
                      }
                    />
                  </Avatar>
                  <p className="text-lg font-semibold">
                    {comment.User.userName}
                  </p>
                </div>
                <div className="pl-12">
                  <p className="text-sm text-zinc-300">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </section>
  );
}