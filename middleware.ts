import { verifyUser } from "@/lib/auth/verifyUser";
import { NextRequest, NextResponse } from "next/server";
import { isBlockedTime } from "./lib/maintenance";

// Define public paths that don't require authentication
const publicPaths = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/verify-reset-otp",
  "/favicon.ico",
  "/logo.jpeg",
  "/api/user/auth",
];

// Check if the path is public
function isPublicPath(pathname: string) {
  return publicPaths.some((p) => pathname.startsWith(p));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {

  // Step 1. Proceed with authentication checks
  const { pathname } = request.nextUrl;


  // Step 2. Check if the site is under maintenance
  if (isBlockedTime() && pathname.includes("/api")) return NextResponse.json({
    message: "The site is under maintenance. Please try again later.",
    success: false,
    timeStamp: new Date().toISOString(),
  }, {
    status: 503
  });


  // Allow public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // Verify user authentication
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
