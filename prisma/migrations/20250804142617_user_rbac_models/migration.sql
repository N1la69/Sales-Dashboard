-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastOTPAttemptAt` DATETIME(3) NULL,
    ADD COLUMN `otpAttempts` INTEGER NULL,
    ADD COLUMN `otpCooldownUntil` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordExpires` DATETIME(3) NULL,
    ADD COLUMN `resetPasswordOTP` INTEGER NULL,
    ADD COLUMN `verificationOTP` INTEGER NULL,
    ADD COLUMN `verificationOTPExpires` DATETIME(3) NULL;
