import { verifyUser } from "@/lib/auth/verifyUser";
import { NextRequest, NextResponse } from "next/server";

const publicPaths = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/verify-reset-otp",
  "/favicon.ico",
  "/api/user/auth",
];

function isPublicPath(pathname: string) {
  return publicPaths.some((p) => pathname.startsWith(p));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const { status, message, user } = await verifyUser(request);

  if (status !== 200 || !user) {
    console.info("Auth failed:", message);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Attach user to headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user", JSON.stringify(user));
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
