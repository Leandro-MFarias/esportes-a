import { CardDescription } from "@/components/ui/card";

interface categoryColorProps {
  category: {
    name: string;
    color: string | null;
  };
}

const colors: Record<string, string> = {
  sky: "text-sky-600",
  lime: "text-lime-600",
  amber: "text-amber-300",
  orange: "text-orange-500",
  teal: "text-teal-600",
};

export function CategoryColor({ category }: categoryColorProps) {
  const textColor = category.color
    ? colors[category.color]
    : "text-muted-foreground";

  return (
    <CardDescription className={`${textColor} font-bold`}>
      {category.name}
    </CardDescription>
  );
}
