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
import { DialogPost } from "./dialog-post";
import { Category } from "@prisma/client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DropDownMenu } from "./dropdown";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { DeleteButton } from "./delete-form-button";

interface UserRole {
  role: string | undefined;
  userId?: string;
  categories: Category[];
}

export function Posts({ role, userId, categories }: UserRole) {
  const [postToDelete, setPostToDelete] = useState<string>("");
  const [alertOpen, setAlertOpen] = useState(false);
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
              <div className="absolute top-8 right-2 sm:right-3">
                <DropDownMenu
                  post={post}
                  setPostToDelete={setPostToDelete}
                  setAlertOpen={setAlertOpen}
                />
              </div>
            )}
            <Link href={`/post/${post.id}`}>
              <CardHeader>
                <CardTitle className="text-3xl max-w-[370px]">
                  {post.title}
                </CardTitle>
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

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que quer deletar este post?
            </AlertDialogTitle>
            <AlertDialogDescription></AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <DeleteButton
                postId={postToDelete}
                onSuccess={() => setAlertOpen(false)}
              />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {userId && <DialogPost userId={userId} categories={categories} />}
    </>
  );
}
