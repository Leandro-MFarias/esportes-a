"use client";

import { createAccount } from "@/app/(auth)/_actions/registerAction";
import {
  RegisterSchema,
  registerSchema,
} from "@/app/(auth)/_validatiors/register-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function handleForm(data: RegisterSchema) {
    try {
      await createAccount(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col border-1 border-zinc-700 p-5 pb-10 rounded-xl h-[490px] w-[440px] space-y-6"
      >
        <div className="self-start">
          <h2 className="text-xl font-bold text-violet-700">Cadastre-se</h2>
          <p className="text-center text-sm text-zinc-400">
            Faça seu cadastro.
          </p>
        </div>

        <div className="flex flex-1 flex-col space-y-6">
          <div className="flex flex-col">
            <label className="text-sm font-bold text-zinc-300">Username</label>
            <input
              type="text"
              placeholder="Nome de usuário"
              className="bg-black border rounded-md border-zinc-800 p-2 outline-none"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="text-sm font-bold text-red-600 pl-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col ">
            <label className="text-sm font-bold text-zinc-300">Email</label>
            <input
              type="text"
              placeholder="eu@exemplo.com"
              className="bg-black border rounded-md border-zinc-800 p-2 outline-none"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="text-sm font-bold text-red-600 pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col ">
            <label className="text-sm font-bold text-zinc-300">Senha</label>
            <input
              type="password"
              placeholder="************"
              className="bg-black border rounded-md border-zinc-800 p-2 outline-none"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="text-sm font-bold text-red-600 pl-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-violet-700 w-full py-2 rounded-2xl font-bold cursor-pointer hover:bg-violet-500 transition duration-150 ease-in"
        >
          {isSubmitting ? "Enviando..." : "Fazer cadastro"}
        </button>
      </form>
      <Link href={"/login"}>
        <p className="text-zinc-400">
          Já possui cadastro?
          <span className="text-white font-bold"> Faça o Login</span>
        </p>
      </Link>
    </div>
  );
}
