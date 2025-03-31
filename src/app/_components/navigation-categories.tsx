"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CategoryWithPosts, Post, useCategory } from "../_context/useCategoryContext";

interface NavigationCatagoriesProps {
  categories: CategoryWithPosts[];
  noFilteredPosts: Post[]
}

export function NavigationCatagory({ categories, noFilteredPosts }: NavigationCatagoriesProps) {
  const { selectedCategory, setSelectedCategory, allPosts, setAllPosts } =
    useCategory();

  function handleCategoryClick(category: CategoryWithPosts) {
    setAllPosts(null);
    setSelectedCategory(category);
  }

  function handleAllPostCLick() {
    setAllPosts(noFilteredPosts);
    setSelectedCategory(null);
  }

  function categoryButtonVariant(category: CategoryWithPosts) {
    return selectedCategory?.id === category.id ? `default` : "outline";
  }

  return (
    <nav className="pl-2 flex items-center">
      <ScrollArea className="w-full">
        <ul className="flex w-max gap-4">
          <li className="text-muted-foreground"> 
            <Button
              onClick={handleAllPostCLick}
              variant={allPosts === null ? "outline" : "default"}
              size="sm"
              className="font-bold min-w-20 rounded-full cursor-pointer"
            >
              Todos
            </Button>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="text-muted-foreground">
              <Button
                onClick={() => handleCategoryClick(category)}
                variant={categoryButtonVariant(category)}
                size="sm"
                className="font-bold min-w-20 rounded-full cursor-pointer"
              >
                {category.name}
              </Button>
            </li>
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </nav>
  );
}
