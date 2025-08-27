import { PermissionSet, User as PrismaUser } from "@/app/generated/prisma";
import prisma from "@/lib/utils";
import crypto from "crypto";
import jwt from "jsonwebtoken";
export type SafeUser = Omit<
  PrismaUser,
  | "hash"
  | "salt"
  | "resetPasswordOTP"
  | "resetPasswordExpires"
  | "otpAttempts"
  | "lastOTPAttemptAt"
  | "otpCooldownUntil"
  | "verificationOTP"
  | "verificationOTPExpires"
> & {
  permissions: PermissionSet[];
};
export class UserModel {
  private user: PrismaUser;

  constructor(user: PrismaUser) {
    this.user = user;
  }

  get userDetails() {
    const {
      hash: _,
      salt: _s,
      resetPasswordOTP: _o,
      resetPasswordExpires: _re,
      otpAttempts: _a,
      lastOTPAttemptAt: _l,
      otpCooldownUntil: _c,
      verificationOTP: _v,
      verificationOTPExpires: _ve,
      ...safeUser
    } = this.user;
    return safeUser;
  }

  isAdmin(): boolean {
    return this.user.role === "ADMIN" || this.user.role === "SUPERADMIN";
  }

  generateJWT(): string {
    if (!process.env.SECRET) throw new Error("JWT secret missing");
    return jwt.sign(
      { id: this.user.id, email: this.user.email },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
  }

  async setPassword(password: string): Promise<void> {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    await prisma.user.update({
      where: { id: this.user.id },
      data: { hash, salt },
    });
  }

  async checkPassword(password: string): Promise<boolean> {
    if (!this.user.hash || !this.user.salt) return false;
    const hash = crypto
      .pbkdf2Sync(password, this.user.salt, 10000, 64, "sha512")
      .toString("hex");
    return this.user.hash === hash;
  }

  async generateResetOTP(): Promise<{
    success: boolean;
    reason: string;
    cooldownUntil?: Date;
  }> {
    const now = Date.now();
    if (
      this.user.otpCooldownUntil &&
      now < this.user.otpCooldownUntil.getTime()
    ) {
      return {
        success: false,
        reason: "cooldown",
        cooldownUntil: this.user.otpCooldownUntil,
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await prisma.user.update({
      where: { id: this.user.id },
      data: {
        resetPasswordOTP: otp,
        resetPasswordExpires: new Date(now + 15 * 60 * 1000),
        otpAttempts: 0,
        otpCooldownUntil: null,
      },
    });

    console.warn("⚠️⚠️ Please Disable this line in production ⚠️⚠️");
    console.warn("OTP sent to user email:", this.user.email, otp);

    return { success: true, reason: "sent" };
  }

  async verifyResetOTP(
    otp: number
  ): Promise<{ success: boolean; reason: string }> {
    const user = await prisma.user.findUnique({ where: { id: this.user.id } });
    const now = Date.now();

    if (
      !user?.resetPasswordOTP ||
      !user.resetPasswordExpires ||
      now > user.resetPasswordExpires.getTime()
    ) {
      return { success: false, reason: "expired" };
    }

    if (user.resetPasswordOTP !== otp) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          otpAttempts: { increment: 1 },
          lastOTPAttemptAt: new Date(),
          otpCooldownUntil:
            (user.otpAttempts ?? 0) + 1 >= 5
              ? new Date(now + 30 * 60 * 1000)
              : null,
        },
      });

      return { success: false, reason: "incorrect" };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordOTP: null,
        resetPasswordExpires: null,
        otpAttempts: 0,
        otpCooldownUntil: null,
      },
    });

    return { success: true, reason: "verified" };
  }

  async saveLastLogin(): Promise<void> {
    await prisma.user.update({
      where: { id: this.user.id },
      data: { lastLogin: new Date() },
    });
  }

  async getPermissions(): Promise<PermissionSet[]> {
    return await prisma.permissionSet.findMany({
      where: { userId: this.user.id },
    });
  }

  /**
   * Update user fields
   */
  async updateUser(data: Partial<PrismaUser>) {
    const updated = await prisma.user.update({
      where: { id: this.user.id },
      data,
    });
    this.user = updated;
    return this.userDetails;
  }

  /**
   * Activate or deactivate user
   */
  async setActiveStatus(isActive: boolean) {
    const updated = await prisma.user.update({
      where: { id: this.user.id },
      data: { isActive },
    });
    this.user = updated;
    return this.userDetails;
  }

  /**
   * Delete user (soft or hard delete, here hard delete)
   */
  async deleteUser() {
    await prisma.permissionSet.deleteMany({ where: { userId: this.user.id } });
    await prisma.user.delete({ where: { id: this.user.id } });
    return { success: true };
  }

  /**
   * Replace or update permissions for a page
   */
  async updatePermissions(page: string, permissions: string[]) {
    // Step 1: check if permission exists
    const existing = await prisma.permissionSet.findFirst({
      where: { userId: this.user.id, page },
    });

    if (existing) {
      // Step 2: update if exists
      return prisma.permissionSet.update({
        where: { id: existing.id },
        data: { permissions },
      });
    } else {
      // Step 3: create if not exists
      return prisma.permissionSet.create({
        data: { userId: this.user.id, page, permissions },
      });
    }
  }

  async updatePermissionsBulk(permissions: Record<string, string[]>) {
    const updates = Object.entries(permissions).map(async ([page, ops]) => {
      const existing = await prisma.permissionSet.findFirst({
        where: { userId: this.user.id, page },
      });

      if (existing) {
        return prisma.permissionSet.update({
          where: { id: existing.id },
          data: { permissions: ops },
        });
      } else {
        return prisma.permissionSet.create({
          data: { userId: this.user.id, page, permissions: ops },
        });
      }
    });

    return Promise.all(updates);
  }

  /**
   * Remove permission set for a page
   */
  async removePermission(page: string) {
    await prisma.permissionSet.deleteMany({
      where: { userId: this.user.id, page },
    });
    return { success: true };
  }
}
