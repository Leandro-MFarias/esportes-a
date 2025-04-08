"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useCategory } from "../_context/useCategoryContext";
import { LikeButton } from "../post/_components/like-button";
import { PencilIcon } from "lucide-react";
import { DialogPost } from "./dialog-post";
import { Category } from "@prisma/client";
import { FormButton } from "./form-button";

interface UserRole {
  role: string | undefined;
  userId?: string;
  categories: Category[];
}

export function Posts({ role, userId, categories }: UserRole) {
  const { selectedCategory, allPosts } = useCategory();

  const postsToDisplay = allPosts || selectedCategory?.Posts;

  if (!postsToDisplay) {
    return <p>Nenhum post disponivel.</p>;
  }

  return (
    <>
      <div
        className={`mb-2 flex flex-wrap gap-8 justify-center 1x4:justify-start`}
      >
        {postsToDisplay.map((post) => (
          <Card key={post.id} className="relative w-[360px] 4x3:w-[434px]">
            {role === "GOD" && userId && (
              <FormButton
                variant={"outline"}
                postToEdit={{
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  existingCategory: post.category.name 
                }}
              >
                <PencilIcon />
              </FormButton>
            )}
            <Link href={`/post/${post.id}`}>
              <CardHeader>
                <CardTitle className="text-3xl">{post.title}</CardTitle>
                <CardDescription>{post.category.name}</CardDescription>
              </CardHeader>
              <CardContent className="leading-7 line-clamp-4 mt-1">
                {post.content}
              </CardContent>
            </Link>
            <CardFooter className="flex flex-col space-y-4">
              <div className="h-[1px] w-full bg-zinc-600" />
              <div className="flex justify-between w-full">
                <div className="flex space-x-2">
                  <LikeButton
                    postId={post.id}
                    initialLikeCount={post.likeCount}
                  />
                </div>
                <p>{post.viewCount} visualização</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {userId && (
        <DialogPost
          userId={userId}
          categories={categories}
        />
      )}
    </>
  );
}
