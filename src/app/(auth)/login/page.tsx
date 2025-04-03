"use client";

import { signIn } from "@/app/(auth)/_actions/loginAction";
import {
  LoginSchema,
  loginSchema,
} from "@/app/(auth)/_validatiors/register-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { ArrowBigLeftIcon } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function handleForm(data: LoginSchema) {
    try {
      const result = await signIn(data);

      if (result.success) {
        router.push("/");
      } else {
        if (result.type === "email") {
          setError("email", {
            type: "server",
            message: result.message,
          });
        } else if (result.type === "password") {
          setError("password", {
            type: "server",
            message: result.message,
          });
        }
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
        className="flex flex-col justify-between border-1 border-zinc-700 p-5 rounded-xl h-[354px] w-[360px]"
        onSubmit={handleSubmit(handleForm)}
      >
        <div className="self-start">
          <h2 className="text-xl font-bold text-violet-700">Boas Vindas</h2>
          <p className="text-center text-sm text-zinc-400">
            Faça Login com seu email e senha
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-bold text-zinc-300">Email</label>
            <Input
              type="Email"
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

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-violet-700 w-full py-2 rounded-2xl font-bold cursor-pointer hover:bg-violet-500 transition duration-150 ease-in"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
           
        </div>
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
