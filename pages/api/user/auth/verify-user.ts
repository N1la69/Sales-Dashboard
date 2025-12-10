import { UserModel } from "@/CustomModels/UserModel";
import prisma from "@/lib/prisma";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Step 1. Extarct token from cookies
    const cookieHeader = req.headers.cookie || "";
    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    // Step 2. Verify the token
    if (!token) throw { message: "No token provided", status: 401 };

    // Step 3. Decode the token
    const decoded = verify(token, process.env.SECRET!);

    // Step 4. Check if decoded token is valid
    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      throw { message: "Invalid token payload", status: 401 };
    }

    // Step 5. Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: decoded?.id },
    });

    // Step 6. Check if user exists and is active
    if (!user) throw { message: "User not found", status: 401 };
    if (!user.isActive) throw { message: "User is not active", status: 403 };

    // Step 7. Create UserModel instance
    const userModel = new UserModel(user);
    const permissions = await userModel.getPermissions();

    return res.status(200).json({
      success: true,
      timeStamp: new Date().toISOString(),
      message: "User verified successfully",
      data: {
        user: userModel.userDetails,
        permissions,
      },
    });
  } catch (error: any) {
    console.error("Auth verify error @ User:", error);
    return res.status(error?.status || 500).json({
      success: false,
      message: error?.message || error || "Internal server error",
      timeStamp: new Date().toISOString(),
    });
  }
}
