import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
interface SessionPayload extends JWTPayload {
  userId: string;
  expiresAt: Date;
  role: string
}

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Erro ao verificar a sessao", error);
    return undefined
  }
}

// CREATE SESSION
export async function createSession(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true }
  })

  if (!user) throw new Error("user nao encontrado")

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt, role: user.role });

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function isSessionValid() {
  const session = (await cookies()).get("session");
  if (!session) return false
  
  try {
    const payload = await decrypt(session.value)
    if (!payload || !payload.exp) return false
    
    const currentDate = new Date().getTime()
    
    return ((payload.exp as number) * 1000) > currentDate

  } catch (error) {
    console.error("Erro ao verificar a sessao:", error)
    return false
  }
}

// REFRESING SESSION
export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

// Delete Session
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
