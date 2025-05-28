import { NextRequest, NextResponse } from "next/server";
import { isSessionValid } from "./app/(auth)/_services/session";

export const config = {
  matcher: "/((?!api|_next|favicon.ico).*)",
};

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/post",
  "/robots",
  "/sitemap",
];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isStaticFile = /\.(png|jpg|jpeg|svg|webp|ico|css|js|json)$/i.test(
    pathname
  );

  if (isStaticFile) {
    return NextResponse.next();
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/post/")) {
    return NextResponse.next();
  }

  if (pathname.endsWith(".xml") || pathname.endsWith(".txt")) {
    return NextResponse.next();
  }

  const session = await isSessionValid();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
