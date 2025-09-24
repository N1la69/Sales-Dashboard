import { UserModel } from '@/CustomModels/UserModel';
import prisma from '@/lib/utils';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Step 1. Extract email from request body
        const { email } = req.body;
        if (!email) throw { status: 400, message: 'Email is required' };

        // Step 2. Find user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw { status: 404, message: 'User not found' };

        // Step 3. Create UserModel instance & generate reset OTP
        const userModel = new UserModel(user);
        const result = await userModel.generateResetOTP();

        return res.status(result.success ? 200 : 400).json({
            success: result.success,
            reason: result.reason,
            cooldownUntil: result.cooldownUntil,
            timeStamp: new Date().toISOString(),
            message: result.success ? 'OTP sent successfully' : 'Failed to send OTP'
        });
    } catch (error: any) {
        console.error('Forgot Password Error @ User:', error);
        return res.status(error?.status || 500).json({
            success: false,
            message: error?.message || error || 'Internal server error',
            timeStamp: new Date().toISOString()
        });
    }
}
