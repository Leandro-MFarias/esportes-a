"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  CategoryWithPosts,
  Post,
  useCategory,
} from "../_context/useCategoryContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavigationCatagoriesProps {
  categories: CategoryWithPosts[];
  noFilteredPosts: Post[];
}

export function NavigationCatagory({
  categories,
  noFilteredPosts,
}: NavigationCatagoriesProps) {
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

  function handleSelectChange(value: string) {
    if (value === "Todos") {
      handleAllPostCLick();
    } else {
      const category = categories.find((category) => category.name === value);
      if (category) handleCategoryClick(category);
    }
  }

  function categoryButtonVariant(category: CategoryWithPosts) {
    return selectedCategory?.id === category.id ? `default` : "outline";
  }

  // mx-0 1x1:mx-auto
  return (
    <nav
      className={`flex items-center mx-0 md:mx-auto`}
    >
      <div className="block md:hidden">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"Todos"}>Todos</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="md:max-w-[700px] 1x0:max-w-[880px] 1x1:max-w-[1040px] xl:max-w-6xl 2xl:max-w-7xl hidden md:block">
        <ScrollArea type="always" className="w-full rounded-4xl">
          <ul className="flex w-max space-x-4 p-4">
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
          <ScrollBar orientation="horizontal" className="max-w-7xl" />
        </ScrollArea>
      </div>
    </nav>
  );
}
