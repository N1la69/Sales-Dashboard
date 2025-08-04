import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { PermissionSet, User as PrismaUser } from '@/app/generated/prisma';
import prisma from '@/lib/utils';
// import { sendEmail } from '@/lib/mailUtils';

export class UserModel {
  private user: PrismaUser;

  constructor(user: PrismaUser) {
    this.user = user;
  }

  get userDetails() {
    return this.user;
  }

  /**
   * * Check if the user is an admin or superadmin
   * @description This method checks the user's role to determine if they have administrative privileges.
   * @returns {boolean} True if the user is an admin or superadmin, false otherwise
   * @memberof UserModel
   */
  isAdmin(): boolean {
    return this.user.role === 'admin' || this.user.role === 'superadmin';
  }

  /**
   * Generate a JWT for the user
   * @description This method generates a JSON Web Token (JWT) for the user.
   * * The token includes the user's ID and email, and is signed with a secret key
   * @returns {string} The generated JWT
   * @memberof UserModel
   */
  generateJWT(): string {
    if (!process.env.SECRET) throw new Error('JWT secret missing');
    return jwt.sign(
      { id: this.user.id, email: this.user.email },
      process.env.SECRET,
      { expiresIn: '1d' }
    );
  }


  /**
   * Set a password for the user
   * @description This method hashes the provided password and saves it to the user's record in the database
   * * It uses the PBKDF2 algorithm for hashing, which is a secure way to store passwords.
   * * The method generates a salt, hashes the password with the salt, and updates the user's
   * @param password The password to set for the user
   * @returns {Promise<void>} A promise that resolves when the password is set
   */
  async setPassword(password: string): Promise<void> {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    await prisma.user.update({
      where: { id: this.user.id },
      data: { hash, salt }
    });
  }

  /**
   * Check if the provided password matches the user's stored password
   * @memberof UserModel
   * @param password The password to check
   * @description This method checks if the provided password matches the user's stored password.
   * @returns {Promise<boolean>} A promise that resolves to true if the password matches, false otherwise.
   * * It uses the PBKDF2 algorithm to hash the provided password with the user's salt and compares it to the stored hash.
   * @example
   * const isMatch = await userModel.checkPassword('user-provided-password');
   * return isMatch; // true if the password matches, false otherwise
   * @throws {Error} If the user's hash or salt is not set, indicating that the password has not been set yet.
   * * This is important to ensure that the method can only be called after the user has set a password.
   */
  async checkPassword(password: string): Promise<boolean> {
    if (!this.user.hash || !this.user.salt) return false;
    const hash = crypto.pbkdf2Sync(password, this.user.salt, 10000, 64, 'sha512').toString('hex');
    return this.user.hash === hash;
  }

  /**
   * Generate a reset OTP for the user
   * @description This method generates a one-time password (OTP) for resetting the user's password.
   * * It sets the OTP and its expiration time in the user's record in the database.
   * @returns {Promise<{ success: boolean; reason: string; cooldownUntil?: Date }>} A promise that resolves to an object indicating success or failure
   */
  async generateResetOTP(): Promise<{ success: boolean; reason: string; cooldownUntil?: Date }> {
    const now = Date.now();
    if (this.user.otpCooldownUntil && now < this.user.otpCooldownUntil.getTime()) {
      return { success: false, reason: 'cooldown', cooldownUntil: this.user.otpCooldownUntil };
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await prisma.user.update({
      where: { id: this.user.id },
      data: {
        resetPasswordOTP: otp,
        resetPasswordExpires: new Date(now + 15 * 60 * 1000),
        otpAttempts: 0,
        otpCooldownUntil: null
      }
    });

    // await sendEmail({
    //   to: this.user.email,
    //   type: 'password_reset',
    //   data: { name: this.user.name, email: this.user.email, otp }
    // });

    return { success: true, reason: 'sent' };
  }

  /**
   * Verify the reset OTP for the user
   * @description This method verifies the one-time password (OTP) for resetting the user's password.
   * * It checks if the OTP is correct and not expired, and updates the user's record accordingly.
   * @param otp The OTP to verify
   * @returns {Promise<{ success: boolean; reason: string }>} A promise that resolves to an object indicating success or failure
   */
  async verifyResetOTP(otp: number): Promise<{ success: boolean; reason: string }> {
    const user = await prisma.user.findUnique({ where: { id: this.user.id } });
    const now = Date.now();

    if (
      !user?.resetPasswordOTP ||
      !user.resetPasswordExpires ||
      now > user.resetPasswordExpires.getTime()
    ) {
      return { success: false, reason: 'expired' };
    }

    if (user.resetPasswordOTP !== otp) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: {
          otpAttempts: { increment: 1 },
          lastOTPAttemptAt: new Date(),
          otpCooldownUntil:
            (user.otpAttempts ?? 0) + 1 >= 5 ? new Date(now + 30 * 60 * 1000) : null
        }
      });

      return { success: false, reason: 'incorrect' };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordOTP: null,
        resetPasswordExpires: null,
        otpAttempts: 0,
        otpCooldownUntil: null
      }
    });

    return { success: true, reason: 'verified' };
  }

  /**
   * Save the user's last login time
   * @description This method updates the user's last login time in the database.
   * * It is typically called after a successful login to track when the user last accessed their account.
   * @returns {Promise<void>} A promise that resolves when the last login time is saved
   */
  async saveLastLogin(): Promise<void> {
    await prisma.user.update({
      where: { id: this.user.id },
      data: { lastLogin: new Date() }
    });
  }

  /**
   * Get the user's permissions
   * @description This method retrieves the permission sets associated with the user.
   * * It returns an array of PermissionSet objects that define what actions the user can perform.
   * @returns {Promise<PermissionSet[]>} A promise that resolves to an array of PermissionSet objects
   */
  async getPermissions(): Promise<PermissionSet[]> {
    const permissions = await prisma.permissionSet.findMany({
      where: { userId: this.user.id }
    });
    return permissions;
  }
}