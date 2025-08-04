import cookie from "cookie";
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
        secure: !isDev,
        sameSite: isDev ? "lax" : "none",
        domain: process.env.COOKIE_DOMAIN || ".localhost",
        path: "/",
        maxAge: 0, // Expire the cookie
      })
    );

    return response.status(200).json({
      success: true,
      message: "Logout successful",
      timeStamp: new Date().toISOString(),
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Logout error @ User Logout:", error);
    return response.status(500).json({
      success: false,
      error: "Server error during logout",
      timeStamp: new Date().toISOString(),
    });
  }
}