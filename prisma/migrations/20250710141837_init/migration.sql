-- CreateTable
CREATE TABLE `psr_data` (
    `psr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `document_no` VARCHAR(45) NOT NULL,
    `document_date` DATETIME(3) NOT NULL,
    `subbrandform_name` VARCHAR(90) NOT NULL,
    `customer_name` VARCHAR(120) NOT NULL,
    `customer_code` VARCHAR(45) NOT NULL,
    `channel_description` VARCHAR(45) NOT NULL,
    `customer_type` VARCHAR(90) NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `brand` VARCHAR(45) NOT NULL,
    `brandform` VARCHAR(45) NOT NULL,
    `retailing` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`psr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel_mapping` (
    `channel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_type` VARCHAR(90) NOT NULL,
    `channel` VARCHAR(45) NOT NULL,
    `broad_channel` VARCHAR(45) NOT NULL,
    `short_channel` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`channel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_mapping` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Old_Store_Code` VARCHAR(45) NOT NULL,
    `New_Store_Code` VARCHAR(45) NOT NULL,
    `New_Branch` VARCHAR(45) NOT NULL,
    `DSE_Code` VARCHAR(45) NOT NULL,
    `ZM` VARCHAR(45) NOT NULL,
    `SM` VARCHAR(45) NOT NULL,
    `BE` VARCHAR(45) NOT NULL,
    `STL` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
