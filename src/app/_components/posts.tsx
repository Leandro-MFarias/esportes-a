"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon } from "lucide-react";
import Link from "next/link";
import { useCategory } from "../_context/useCategoryContext";

export function Posts() {
  const { selectedCategory, allPosts } = useCategory();

  const postsToDisplay = allPosts || selectedCategory?.Posts;

  if (!postsToDisplay) {
    return <p>Nenhum post disponivel.</p>;
  }

  return (
    <>
      {postsToDisplay.map((post) => (
        <Card key={post.id} className="w-[434px]">
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
                <HeartIcon />
                <p>{post.likeCount}</p>
              </div>
              <p>{post.viewCount} visualização</p>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
