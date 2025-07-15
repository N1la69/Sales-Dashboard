-- CreateTable
CREATE TABLE `psr_data_temp` (
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
