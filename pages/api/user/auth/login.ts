import { UserModel } from "@/CustomModels/UserModel";
import prisma from "@/lib/utils";
import * as cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";


export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    // Step 1. Extract email and password from request body
    const { email, password } = req.body;

    // Step 2. Validate email and password
    if (!email || !password) {
      throw { message: "Email and password are required", status: 400 };
    }

    // Step 3. Find user by email
    const foundUser = await prisma.user.findUnique({ where: { email } });

    if (!foundUser) throw { message: "User does not exist", status: 404 };
    if (!foundUser.isActive) throw { message: "User is not active", status: 403 };

    // Step 4. Create UserModel instance
    const userModel = new UserModel(foundUser);

    // Step 5. Check if password matches
    const isPasswordValid = await userModel.checkPassword(password);
    if (!isPasswordValid) throw { message: "Wrong password", status: 401 };

    // Step 6. Generate JWT and set cookie
    const token = userModel.generateJWT();
    const isDev = process.env.NODE_ENV !== "production";

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: !isDev, // cookies must be secure (https) in production
        sameSite: isDev ? "lax" : "none", // "none" needed for cross-site cookies
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        domain: isDev ? undefined : process.env.COOKIE_DOMAIN,
        /**
         * - Localhost: undefined (host-only cookie for localhost:3000)
         * - Vercel: undefined → works fine with your project domain
         * - Custom domain (e.g. dashboard.mycompany.com):
         *     set COOKIE_DOMAIN=".mycompany.com" in env
         */
      })
    );

    // Step 7. Update lastLoginTime
    await userModel.saveLastLogin();

    // Step 8. Get user permissions
    const permissions = await userModel.getPermissions();

    return res.status(200).json({
      success: true,
      timeStamp: new Date().toISOString(),
      message: `Welcome Back! ${userModel.userDetails.name}`,
      data: {
        userModel,
        permissions,
      },
    });

  } catch (error: any) {
    console.error("Login error @ User:", error);
    return res.status(error?.status || 500).json({
      success: false,
      message: error?.message || error || "Server error during login",
      timeStamp: new Date().toISOString(),
    });
  }
}
