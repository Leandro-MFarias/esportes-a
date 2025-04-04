// import { Avatar } from "@/components/ui/avatar";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { AvatarImage } from "@/components/ui/avatar";
import { Loader2Icon } from "lucide-react";
// import { Form } from "./formGeneral";

export function Comments() {


  return (
    <section className="border border-zinc-800 max-w-6xl py-5  px-8 mx-auto mb-10 space-y-6">
      <div className="space-y-3">
        {/* <h2 className="text-3xl font-semibold">Comentários</h2>
        <Form />
        <div className="w-full h-[1px] bg-zinc-800" /> */}
      </div>

      {/* ONDE CHEGA OS COMENTARIOS */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-2xl">Seção de Comentários está sendo criada</p>
        <Loader2Icon className="animate-spin" size={45} />
      </div>
      
    </section>
  );
}
