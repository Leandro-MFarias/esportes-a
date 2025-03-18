"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  userName: z.string().min(3, "Minimo de 3 caracteres"),
  password: z.string().min(3, "Senha incorreta"),
});

type FormSchema = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  function handleForm(data: FormSchema) {
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="flex flex-col items-center border-1 border-zinc-700 p-5 space-y-6 rounded-xl w-[360px]"
        onSubmit={handleSubmit(handleForm)}
      >
        <h2 className="text-center">Faça Login</h2>
        <div className="space-y-1">
          <input
            type="text"
            placeholder="Digite seu usuario"
            className="bg-black border border-zinc-800 px-2 py-1 outline-none"
            {...register("userName")}
          />
          {errors.userName?.message && (
            <p className="text-red-600 text-sm font-bold pl-2">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="password"
            placeholder="Digite sua senha"
            className="bg-black border border-zinc-800 px-2 py-1 outline-none"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-600 text-sm font-bold pl-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-violet-700 w-[80%] py-1 rounded-2xl font-bold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
