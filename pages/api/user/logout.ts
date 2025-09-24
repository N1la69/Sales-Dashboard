import * as cookie from "cookie";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function GET(request: NextRequest, response: NextApiResponse) {
  try {

    // Step 1: Clear the token cookie
    const isDev = process.env.NODE_ENV !== "production";
    response.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: !isDev, // cookies must be secure (https) in production
        sameSite: isDev ? "lax" : "none", // "none" needed for cross-site cookies
        path: "/",
        maxAge: 0, // 1 day
        domain: isDev ? undefined : process.env.COOKIE_DOMAIN,
        /**
         * - Localhost: undefined (host-only cookie for localhost:3000)
         * - Vercel: undefined → works fine with your project domain
         * - Custom domain (e.g. dashboard.mycompany.com):
         *     set COOKIE_DOMAIN=".mycompany.com" in env
         */
      })
    );

    return response.status(200).json({
      success: true,
      message: "Logout successful",
      timeStamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("Logout error @ User:", error);
    return response.status(error?.status || 500).json({
      success: false,
      message: error?.message || error || "Something went wrong during logout",
      timeStamp: new Date().toISOString(),
    });
  }
}