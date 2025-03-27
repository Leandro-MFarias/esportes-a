
import { Header } from "./_components/header";
import { Posts } from "./_components/posts";

export default function Home() {
  return (
    <div className="space-y-10">
      <Header />
      <section className="mx-auto max-w-7xl space-y-10">
        <nav className="pl-2 flex items-center">
          <ul className="flex gap-4 font-bold text-muted-foreground">
            <li>Todos os Posts</li>
            <li>Futebol</li>
            <li>Basquete</li>
            <li>Fórmula 1</li>
            <li>Geral</li>
          </ul>
        </nav>

        <div className="flex flex-wrap gap-8 justify-center">
            <Posts />
        </div>
      </section>
    </div>
  );
}
