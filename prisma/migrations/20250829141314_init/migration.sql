-- CreateTable
CREATE TABLE `psr_data_temp` (
    `psr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `document_no` VARCHAR(45) NOT NULL,
    `document_date` DATETIME(3) NOT NULL,
    `subbrandform` VARCHAR(90) NOT NULL,
    `customer_name` VARCHAR(120) NOT NULL,
    `customer_code` VARCHAR(45) NOT NULL,
    `p_code` INTEGER NOT NULL,
    `customer_type` VARCHAR(90) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(45) NOT NULL,
    `brandform` VARCHAR(45) NOT NULL,
    `retailing` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`psr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `psr_data_historical` (
    `psr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `document_no` VARCHAR(45) NOT NULL,
    `document_date` DATETIME(3) NOT NULL,
    `subbrandform` VARCHAR(90) NOT NULL,
    `customer_name` VARCHAR(120) NOT NULL,
    `customer_code` VARCHAR(45) NOT NULL,
    `p_code` INTEGER NOT NULL,
    `customer_type` VARCHAR(90) NOT NULL,
    `category` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(45) NOT NULL,
    `brandform` VARCHAR(45) NOT NULL,
    `retailing` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`psr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `psr_finalized_temp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `document_date` DATETIME(3) NOT NULL,
    `customer_code` VARCHAR(45) NOT NULL,
    `branch` VARCHAR(100) NULL,
    `ZM` VARCHAR(45) NULL,
    `RSM` VARCHAR(45) NULL,
    `ASM` VARCHAR(45) NULL,
    `TSI` VARCHAR(45) NULL,
    `category` VARCHAR(255) NULL,
    `brand` VARCHAR(45) NULL,
    `brandform` VARCHAR(45) NULL,
    `subbrandform` VARCHAR(90) NULL,
    `base_channel` VARCHAR(45) NULL,
    `short_channel` VARCHAR(45) NULL,
    `channel_desc` VARCHAR(255) NULL,
    `retailing` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `psr_data_finalized` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `document_date` DATETIME(3) NOT NULL,
    `customer_code` VARCHAR(45) NOT NULL,
    `branch` VARCHAR(100) NULL,
    `ZM` VARCHAR(45) NULL,
    `RSM` VARCHAR(45) NULL,
    `ASM` VARCHAR(45) NULL,
    `TSI` VARCHAR(45) NULL,
    `category` VARCHAR(255) NULL,
    `brand` VARCHAR(45) NULL,
    `brandform` VARCHAR(45) NULL,
    `subbrandform` VARCHAR(90) NULL,
    `base_channel` VARCHAR(45) NULL,
    `short_channel` VARCHAR(45) NULL,
    `channel_desc` VARCHAR(255) NULL,
    `retailing` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel_mapping` (
    `channel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_type` VARCHAR(90) NOT NULL,
    `base_channel` VARCHAR(45) NOT NULL,
    `short_channel` VARCHAR(45) NOT NULL,
    `channel_desc` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`channel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_mapping` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Old_Store_Code` VARCHAR(45) NOT NULL,
    `New_Store_Code` VARCHAR(45) NOT NULL,
    `customer_name` VARCHAR(120) NOT NULL,
    `customer_type` VARCHAR(90) NOT NULL,
    `Branch` VARCHAR(45) NOT NULL,
    `DSE_Code` VARCHAR(45) NOT NULL,
    `ZM` VARCHAR(45) NOT NULL,
    `RSM` VARCHAR(45) NOT NULL,
    `ASM` VARCHAR(45) NOT NULL,
    `TSI` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_mapping` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `p_code` INTEGER NOT NULL,
    `desc_short` VARCHAR(90) NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `brand` VARCHAR(45) NOT NULL,
    `brandform` VARCHAR(45) NOT NULL,
    `subbrandform` VARCHAR(90) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `product_mapping_p_code_key`(`p_code`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mapping_change_flag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `changed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `processed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `hash` TEXT NULL,
    `salt` TEXT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'staff',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLogin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `image` VARCHAR(191) NOT NULL DEFAULT 'https://picsum.photos/100/100',
    `resetPasswordOTP` INTEGER NULL,
    `verificationOTP` INTEGER NULL,
    `verificationOTPExpires` DATETIME(3) NULL,
    `resetPasswordExpires` DATETIME(3) NULL,
    `otpAttempts` INTEGER NULL,
    `lastOTPAttemptAt` DATETIME(3) NULL,
    `otpCooldownUntil` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PermissionSet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `page` VARCHAR(100) NOT NULL,
    `permissions` JSON NOT NULL,

    UNIQUE INDEX `PermissionSet_userId_page_key`(`userId`, `page`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PermissionSet` ADD CONSTRAINT `PermissionSet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
