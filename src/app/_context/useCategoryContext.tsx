"use client";

import { Prisma } from "@prisma/client";
import { createContext, ReactNode, useContext, useState } from "react";

export type CategoryWithPosts = Prisma.CategoryGetPayload<{
  include: {
    Posts: {
      select: {
        id: true;
        title: true;
        content: true;
        mediaUrl: true;
        likeCount: true;
        viewCount: true;
        category: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export interface Post {
  id: string;
  title: string;
  content: string;
  mediaUrl?: string | null | undefined;
  likeCount: number;
  viewCount: number;
  category: {
    name: string;
  };
}

interface CategoryContextType {
  selectedCategory: CategoryWithPosts | null;
  setSelectedCategory: (category: CategoryWithPosts | null) => void;
  allPosts: Post[] | null;
  setAllPosts: (posts: Post[] | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export function CategoryProvider({ children, recent }: { children: ReactNode; recent: Post[] }) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithPosts | null>(null);
  const [allPosts, setAllPosts] = useState<Post[] | null>(recent);

  return (
    <CategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory, allPosts, setAllPosts }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }

  return context;
}
