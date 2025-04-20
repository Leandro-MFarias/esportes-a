"use client";

import { User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "@/app/_actions/update-user";
import { changeSchema, ChangeSchema } from "../_validator/change-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditProfileProps {
  user: Pick<User, "id" | "userName" | "email" >;
}

export function EditProfile({ user }: EditProfileProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangeSchema>({
    resolver: zodResolver(changeSchema),
    defaultValues: {
      email: user.email,
    },
  });

  async function handleForm(data: ChangeSchema) {
    try {
      const result = await updateUserProfile(user.id, data);

      if (result?.success) {
        toast.success("Perfil atualizado.", {
          description: "Suas informações foram atualizadas com sucesso",
        });
        router.refresh();
      }
    } catch {
      toast.error("Erro");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className={`flex w-full flex-col self-start space-y-6`}
    >
      <div>
        <label htmlFor="">Username</label>
        <Input
          className={`w-full`}
          placeholder={user?.userName}
          {...register("userName")}
        />
        {errors.userName && (
          <p className="text-red-600 text-sm font-bold pl-2">
            {errors.userName.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="">Email</label>
        <Input className="" placeholder={user?.email} {...register("email")} />
        {errors.email && (
          <p className="text-red-600 text-sm font-bold">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="self-end border borde-zinc-600 rounded-full w-40 px-1 py-2 cursor-pointer transintion duration-150 hover:bg-zinc-900"
      >
        {isSubmitting ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
}
