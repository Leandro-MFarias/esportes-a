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
import { CategoryColor } from "./category-colors";

interface NavigationCatagoriesProps {
  categories: CategoryWithPosts[];
  recent: Post[];
}

export function NavigationCatagory({
  categories,
  recent,
}: NavigationCatagoriesProps) {
  const { selectedCategory, setSelectedCategory, allPosts, setAllPosts } =
    useCategory();

  function handleCategoryClick(category: CategoryWithPosts) {
    setAllPosts(null);
    setSelectedCategory(category);
  }

  function handleAllPostCLick() {
    setAllPosts(recent);
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
    return selectedCategory?.id === category.id ? `default` : "secondary";
  }

  function categoryButtonAll() {
    return allPosts === null ? "secondary" : "default";
  }

  return (
    <nav className={`flex items-center mx-0 `}>
      <div className="block md:hidden">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]" aria-label="Categorias">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={"Todos"}>Recentes</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                <CategoryColor category={category} />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="md:max-w-[700px] 1x0:max-w-[880px] 1x1:max-w-[1040px] xl:max-w-6xl 2xl:max-w-7xl hidden md:block">
        <ScrollArea type="always" className="w-full ">
          <ul className="flex w-max space-x-2 p-4">
            <li className="text-muted-foreground">
              <Button
                onClick={handleAllPostCLick}
                variant={categoryButtonAll()}
                size="sm"
                className={`font-semibold min-w-24 rounded-md cursor-pointer py-4 ${
                  allPosts === null && "text-muted-foreground hover:text-white"
                }`}
              >
                Recentes
              </Button>
            </li>
            {categories.map((category) => (
              <li key={category.id} className="text-muted-foreground">
                <Button
                  onClick={() => handleCategoryClick(category)}
                  variant={categoryButtonVariant(category)}
                  size="sm"
                  className={`font-semibold min-w-24 rounded-md cursor-pointer py-3 ${
                    selectedCategory?.id !== category.id &&
                    "text-muted-foreground hover:text-white"
                  }`}
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
