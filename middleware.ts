import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth/verifyUser";

const publicPaths = [
  "/login",
  "/forget-password",
  "/reset-forget-password",
  "/verify-reset-otp",
  "/favicon.ico",
  "/api/user/auth",
];

export function isPublicPath(pathname: string) {
  return publicPaths.some((p) => pathname.startsWith(p));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Exclude API routes and static files from middleware
    // This ensures that the middleware does not interfere with API calls or static assets
  ],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next(); // ✅ skip auth check
  }

  const { message, status } = await verifyUser(request);

  if (status !== 200) {
    console.info("Auth failed:", message);
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
