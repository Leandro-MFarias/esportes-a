"use client";

import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { checkUserLikedPost, toggleLike } from "../_actions/like-action";
import { toast } from "sonner";

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
}

export function LikeButton({ postId, initialLikeCount }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLikeStatus = async () => {
      const { isLiked, isLoggedIn } = await checkUserLikedPost(postId);

      setIsLiked(isLiked);
      setIsLoggedIn(isLoggedIn);
    };
    checkLikeStatus();
  }, [postId]);

  async function handleLikeClick() {
    if (!isLoggedIn) {
      toast.error("Você precisa estar logado para curtir um post");
      return;
    }

    try {
      const result = await toggleLike(postId);

      if (result.success) {
        setIsLiked(result.liked);
        setLikeCount((prev) => (result.liked ? prev + 1 : prev - 1));
      } else if (result.message) {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error liking post: ", error);
      toast.error("Ocorreu um erro ao processar sua curtida");
    }
  }

  return (
    <button onClick={handleLikeClick} className="flex items-center space-x-0.5 cursor-pointer">
      <HeartIcon
        className={`transition duration-150 ease-in ${
          isLiked ? "fill-red-500 text-red-500" : "hover:text-red-500"
        }`}
      />
      <span className="text-sm self-end">{likeCount}</span>
    </button>
  );
}
