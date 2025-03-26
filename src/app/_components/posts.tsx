import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Posts() {
  return (
    <Card className="w-[484px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
          voluptates incidunt doloremque optio est excepturi hic, sit et
          recusandae quaerat laudantium voluptatibus. Nemo maiores minus
          nesciunt aut minima! Ut, autem?
        </p>
      </CardContent>
      <CardFooter>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed nam
          quisquam vero, quia expedita harum at nemo suscipit porro, officia
          iusto laudantium qui, alias repellat. Totam dolorum error est?
          Recusandae!
        </p>
      </CardFooter>
    </Card>
  );
}
