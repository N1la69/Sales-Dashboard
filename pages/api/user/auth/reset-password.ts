import { UserModel } from '@/CustomModels/UserModel';
import prisma from '@/lib/utils';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Step 1. Extract email, OTP, and new password from request body
        const { email, otp, newPassword } = req.body;

        // Step 2. Validate input
        if (!email || !otp || !newPassword) throw { message: 'Missing required fields', status: 400 };

        // Step 3. Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw { message: 'User not found', status: 404 };
        if (!user.isActive) throw { message: 'User is not active', status: 403 };

        // Step 4. Create UserModel instance
        const userModel = new UserModel(user);

        // Step 5. Verify the OTP
        const verifyResult = await userModel.verifyResetOTP(Number(otp));

        // Step 6. Check if OTP verification was successful
        if (!verifyResult.success) {
            throw { message: verifyResult.reason, status: 400 };
        }

        // Step 7. Set the new password
        await userModel.setPassword(newPassword);

        // Step 8. Generate a new JWT for the user & set it in a cookie
        const token = userModel.generateJWT();
        const isDev = process.env.NODE_ENV !== "production";

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
                httpOnly: true,
                secure: !isDev,
                sameSite: isDev ? "lax" : "none",
                domain: process.env.COOKIE_DOMAIN || ".localhost",
                path: "/",
                maxAge: 86400,
            })
        );

        // Step 9. Update lastLoginTime
        await userModel.saveLastLogin();

        // Step 10. Get user permissions
        const permissions = await userModel.getPermissions();


        return res.status(200).json({
            success: true,
            timeStamp: new Date().toISOString(),
            message: "Login successful",
            data: {
                userModel,
                permissions,
            },
        });
    } catch (error: any) {
        console.error("Reset Password Error @ User:", error);
        return res.status(error?.status || 500).json({
            success: false,
            message: error?.message || error || "Server error during reset password",
            timeStamp: new Date().toISOString(),
        });
    }
}