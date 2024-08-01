import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptJWT } from "./lib/session";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = [
    '/dashboard',
    '/almacen',
    '/planificacion',
  ];

  const currentPath = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

  if (isProtectedRoute) {
    const cookie = cookies().get('session')?.value;
    const session = await decryptJWT(cookie);
    console.log(cookie)
    console.log('middleware');
    if (!session?.userId) {
      console.log('no');
      return NextResponse.redirect(new URL('/login1', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/almacen/:path*',
    '/planificacion/:path*',
    '/administracion/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
