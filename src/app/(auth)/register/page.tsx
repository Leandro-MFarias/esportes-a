"use client";

import { createAccount } from "@/app/(auth)/_actions/registerAction";
import {
  RegisterSchema,
  registerSchema,
} from "@/app/(auth)/_validatiors/register-validators";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function handleForm(data: RegisterSchema) {
    try {
      const result = await createAccount(data);

      if (result.success) {
        router.push("/")
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col border-1 border-zinc-700 py-2 px-5 pb-10 rounded-xl h-[424px] w-[360px] space-y-4"
      >
        <div className="self-start">
          <h2 className="text-xl font-bold text-violet-700">Cadastre-se</h2>
          <p className="text-center text-sm text-zinc-400">
            Faça seu cadastro.
          </p>
        </div>

        <div className="flex flex-1 flex-col space-y-3">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-zinc-300">Username</label>
            <Input
              type="text"
              placeholder="Nome de usuário"
              className="outline-none"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="pl-1 text-red-500 text-sm font-bold">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-zinc-300">Email</label>
            <Input
              type="text"
              placeholder="eu@exemplo.com"
              className="outline-none"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="pl-1 text-red-500 text-sm font-bold">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-zinc-300">Senha</label>
            <Input
              type="password"
              placeholder="************"
              className="outline-none"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="pl-1 text-red-500 text-sm font-bold">
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
