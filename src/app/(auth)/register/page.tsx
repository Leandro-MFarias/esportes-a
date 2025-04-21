"use client";

import { createAccount } from "@/app/(auth)/_actions/registerAction";
import {
  RegisterSchema,
  registerSchema,
} from "@/app/(auth)/_validatiors/register-validators";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeftIcon, EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  const [isHide, setIsHide] = useState(true);
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
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen space-y-2">
      <Link
        href="/"
        className="absolute top-10 left-10 text-muted-foreground hover:text-zinc-100 hover:scale-110 transition duration-150 ease-in"
      >
        <ArrowBigLeftIcon size={30} />
      </Link>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="flex flex-col border-1 border-zinc-700 py-2 px-5 pb-10 rounded-xl h-[424px] w-[360px] sm:w-[420px] space-y-4"
      >
        <div className="self-start">
          <h2 className="text-xl font-bold text-lime-500">Cadastre-se</h2>
          <p className="text-center text-sm text-zinc-400">
            Faça seu cadastro.
          </p>
        </div>

        <div className="flex flex-1 flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-zinc-300">Username</label>
            <Input
              type="text"
              placeholder="Nome de usuário"
              className="outline-none"
              {...register("username")}
            />
            {errors.username?.message && (
              <p className="pl-1 text-red-600 text-xs font-bold">
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
              <p className="pl-1 text-red-600 text-xs font-bold">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-zinc-300">Senha</label>
            <div className="relative">
              <Input
                type={`${isHide ? "password" : "text"}`}
                placeholder="************"
                className="outline-none"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="pl-1 text-red-600 text-xs font-bold">
                  {errors.password.message}
                </p>
              )}
              <div onClick={() => setIsHide(!isHide)}>
                {isHide ? (
                  <EyeClosedIcon className="absolute right-2 top-1.5 text-muted-foreground" />
                ) : (
                  <EyeIcon className="absolute right-2 top-1.5 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-lime-500 w-full py-2 rounded-2xl font-bold cursor-pointer hover:bg-lime-400 transition duration-150 ease-in"
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
