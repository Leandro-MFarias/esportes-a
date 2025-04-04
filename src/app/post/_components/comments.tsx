import { Avatar } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AvatarImage } from "@/components/ui/avatar";
import { Form } from "./form-general";

export function Comments() {
  return (
    <section className="border border-zinc-800 max-w-6xl py-5  px-8 mx-auto mb-10 space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold">Comentários</h2>
        <Form />
        <div className="w-full h-[1px] bg-zinc-800" />
      </div>

      {/* ONDE CHEGA OS COMENTARIOS */}
      <ScrollArea type="always" className="h-60 pr-4">
        {/* UNICA */}
        <div className="flex flex-col pb-8">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/profile-null.png" />
            </Avatar>
            <p className="text-lg font-semibold">LeHunt</p>
          </div>
          <div className="pl-10">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              fugiat itaque quas aliquid eveniet sint, perspiciatis ipsa beatae
              ab incidunt, quo explicabo rerum ut magnam quasi fugit dicta
              aliquam! Tempore.
            </p>
          </div>
          <button className="self-end text-sm text-muted-foreground hover:text-zinc-100 transition durantion-110 cursor-pointer">
            Responder
          </button>
        </div>
        {/* FIMMMMM */}

        <div className="flex flex-col pb-8">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/profile-null.png" />
            </Avatar>
            <p className="text-lg font-semibold">LeHunt</p>
          </div>
          <div className="pl-10">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              fugiat itaque quas aliquid eveniet sint, perspiciatis ipsa beatae
              ab incidunt, quo explicabo rerum ut magnam quasi fugit dicta
              aliquam! Tempore.
            </p>
          </div>
          <button className="self-end text-sm text-muted-foreground hover:text-zinc-100 transition durantion-110 cursor-pointer">
            Responder
          </button>
        </div>

        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </section>
  );
}

