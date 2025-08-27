/* eslint-disable @typescript-eslint/no-explicit-any */
import { SafeUser, UserModel } from "@/CustomModels/UserModel";
import prisma from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";

async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const foundUsers = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isActive: true,
                lastLogin: true,
                image: true,
                permissionSets: true,
            },
        });

        if (!foundUsers?.length) {
            throw { message: "Users not found", status: 404 };
        }

        return res.status(200).json({
            success: true,
            timeStamp: new Date().toISOString(),
            message: "Fetched users",
            data: foundUsers,
        });
    } catch (error: any) {
        return res.status(error?.status || 500).json({
            success: false,
            error: error?.message || "Server error during fetch",
            timeStamp: new Date().toISOString(),
        });
    }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const usersData = req.body;

        if (!Array.isArray(usersData) || !usersData.length) {
            throw { message: "Invalid request body", status: 400 };
        }

        const createdUsers: SafeUser[] = [];

        for (const user of usersData) {
            const newUser = await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    role: user.role ?? "staff",
                    isActive: user.isActive ?? true,
                    lastLogin: user.lastLogin ? new Date(user.lastLogin) : new Date(),
                    image: user.image ?? "https://picsum.photos/100/100",
                },
            });

            const userModel = new UserModel(newUser);

            if (user.password) {
                await userModel.setPassword(user.password);
            }

            if (user.permissions?.length) {
                for (const perm of user.permissions) {
                    await userModel.updatePermissions(perm.page, perm.permissions);
                }
            }

            createdUsers.push(userModel.userDetails);
        }

        return res.status(201).json({
            success: true,
            timeStamp: new Date().toISOString(),
            message: "Users created successfully",
            data: createdUsers,
        });
    } catch (error: any) {
        return res.status(error?.status || 500).json({
            success: false,
            error: error?.message || "Server error during creation",
            timeStamp: new Date().toISOString(),
        });
    }
}

// ✅ Update user fields / toggle active
async function PUT(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id, data } = req.body; // { id: 1, data: { name: "...", isActive: true } }

        if (!id) throw { message: "Missing user id", status: 400 };

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw { message: "User not found", status: 404 };

        const userModel = new UserModel(user);
        const { password, ...restItems } = data;
        let updated;
        if (password) {
            await userModel.setPassword(password);
        }
        if (Object.keys(restItems).length) {
            updated = await userModel.updateUser(restItems);
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updated,
        });
    } catch (error: any) {
        return res.status(error?.status || 500).json({
            success: false,
            error: error?.message || "Server error during update",
        });
    }
}

// ✅ Update or remove permissions
async function PATCH(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId, permissions } = req.body;
        if (!userId || !permissions || typeof permissions !== "object") {
            throw { message: "userId and permissions required", status: 400 };
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw { message: "User not found", status: 404 };

        const userModel = new UserModel(user);
        const result = await userModel.updatePermissionsBulk(permissions);

        return res.status(200).json({
            success: true,
            message: "Permissions updated",
            data: result,
        });
    } catch (error: any) {
        return res.status(error?.status || 500).json({
            success: false,
            error: error?.message || "Server error during permissions update",
        });
    }
}

// ✅ Delete user
async function DELETE(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.body;
        if (!id) throw { message: "User id required", status: 400 };

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw { message: "User not found", status: 404 };

        const userModel = new UserModel(user);
        await userModel.deleteUser();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        return res.status(error?.status || 500).json({
            success: false,
            error: error?.message || "Server error during deletion",
        });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            return GET(req, res);
        case "POST":
            return POST(req, res);
        case "PUT":
            return PUT(req, res);
        case "PATCH":
            return PATCH(req, res);
        case "DELETE":
            return DELETE(req, res);
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "PATCH", "DELETE"]);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
