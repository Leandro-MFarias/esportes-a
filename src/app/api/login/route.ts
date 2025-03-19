import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // req.json() pega os dados do formulario enviado
    // Convertendo os dados recebidos para JSON
    const { userName, password } = await req.json();

    // Verifica se o user existe no banco de dados
    const user = await db.users.findUnique({
      where: { userName },
    });

    // Se nao encontrar retorna um erro
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Comparar a senha com a senha do banco
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Senha incorreta" },
        { status: 401 },
      )
    }

    // Se tudo estiver certo, retorna os dados do user sem a senha
    return NextResponse.json(
      {
        message: "Login bem-sucedido",
        user: {
          id: user.id,
          name: user.name,
          userName: user.userName,
          email: user.email,
          picture: user.picture,
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("ERROR ao tentar fazer o login:", error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
