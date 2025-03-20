"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(3, "Digite um email valido"),
  password: z.string().min(3, "Digite uma senha valida"),
});

type FormSchema = z.infer<typeof schema>;

export default function LoginPage() {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  async function handleForm(data: FormSchema) {
    setError("");

    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
      } else {
        console.log("User autenticado:", result.user);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-2">
      <form
        className="flex flex-col justify-between border-1 border-zinc-700 p-5 rounded-xl h-[310px] w-[360px]"
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
            <input
              type="text"
              id="email"
              placeholder="eu@exemplo.com"
              className="bg-black border rounded-md border-zinc-800 p-2 outline-none"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className="pl-1 text-red-500 text-sm font-bold">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <input
              type="password"
              placeholder="************"
              className="bg-black border rounded-md border-zinc-800 p-2 outline-none"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className="pl-1 text-red-500 text-sm font-bold">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

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
