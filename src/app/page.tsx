import { PlusIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex justify-center pt-10">
        <button className="flex items-center text-zinc-600 hover:text-white transition duration-150 ease-in gap-1 cursor-pointer">
          Novo Post
          <PlusIcon size={20} />
        </button>
      </div>
    </div>
  );
}
