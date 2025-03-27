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

export function Posts() {
  return (
    <Card className="w-[484px]">
      <Link href={"/"}>
        <CardHeader>
          <CardTitle className="text-3xl">
            Lorem ipsum dolor sit amet.
          </CardTitle>
          <CardDescription>Futebol</CardDescription>
        </CardHeader>
        <CardContent className="leading-7 line-clamp-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
          voluptates incidunt doloremque optio est excepturi hic, sit et
          recusandae quaerat laudantium voluptatibus. Nemo maiores minus
          nesciunt aut minima! Ut, autem?
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col space-y-4">
        <div className="h-[1px] w-full bg-zinc-600" />
        <div className="flex justify-between w-full">
          <HeartIcon />
          <div className="flex space-x-6">
            <p>0 comentário</p>
            <p>0 visualização</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
