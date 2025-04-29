import { NextRequest, NextResponse } from "next/server";
import { isSessionValid } from "./app/(auth)/_services/session";

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
} 

const publicRoutes = ['/', '/login', '/register', '/post', '/robots', '/sitemap']

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/post/')) {
    return NextResponse.next()
  }

  const session = await isSessionValid()
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}
