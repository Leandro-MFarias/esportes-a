"use client";

import { signIn } from "@/app/(auth)/_actions/loginAction";
import {
  LoginSchema,
  loginSchema,
} from "@/app/(auth)/_validatiors/register-validators";
import { ContainerInput } from "@/app/_components/form-inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleForm(data: LoginSchema) {
    try {
      await signIn(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      <form
        className="flex flex-col justify-between border-1 border-zinc-700 p-5 rounded-xl h-[320px] w-[360px]"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="self-start">
          <h2 className="text-xl font-bold text-violet-700">Boas Vindas</h2>
          <p className="text-center text-sm text-zinc-400">
            Faça Login com seu email e senha
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          <ContainerInput
            label="Email"
            type="text"
            placeholder="eu@exemplo.com"
            errors={errors}
            register={register}
            name="email"
          />

          <ContainerInput
            label="Senha"
            type="password"
            placeholder="************"
            errors={errors}
            register={register}
            name="password"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-violet-700 w-full py-2 rounded-2xl font-bold cursor-pointer hover:bg-violet-500 transition duration-150 ease-in"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <Link href={"/register"}>
        <p className="text-zinc-400">
          Não possui cadastro?
          <span className="text-white font-bold"> Registre-se</span>
        </p>
      </Link>
    </div>
  );
}