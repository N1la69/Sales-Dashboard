/*
  Warnings:

  - You are about to drop the column `channel_description` on the `psr_data` table. All the data in the column will be lost.
  - You are about to drop the column `subbrandform_name` on the `psr_data` table. All the data in the column will be lost.
  - You are about to drop the column `channel_description` on the `psr_data_temp` table. All the data in the column will be lost.
  - You are about to drop the column `subbrandform_name` on the `psr_data_temp` table. All the data in the column will be lost.
  - Added the required column `p_code` to the `psr_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subbrandform` to the `psr_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `p_code` to the `psr_data_temp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subbrandform` to the `psr_data_temp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `store_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_type` to the `store_mapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `psr_data` DROP COLUMN `channel_description`,
    DROP COLUMN `subbrandform_name`,
    ADD COLUMN `p_code` INTEGER NOT NULL,
    ADD COLUMN `subbrandform` VARCHAR(90) NOT NULL;

-- AlterTable
ALTER TABLE `psr_data_temp` DROP COLUMN `channel_description`,
    DROP COLUMN `subbrandform_name`,
    ADD COLUMN `p_code` INTEGER NOT NULL,
    ADD COLUMN `subbrandform` VARCHAR(90) NOT NULL;

-- AlterTable
ALTER TABLE `store_mapping` ADD COLUMN `customer_name` VARCHAR(120) NOT NULL,
    ADD COLUMN `customer_type` VARCHAR(90) NOT NULL;

-- CreateTable
CREATE TABLE `product_mapping` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `p_code` INTEGER NOT NULL,
    `desc_short` VARCHAR(90) NOT NULL,
    `category` VARCHAR(45) NOT NULL,
    `brandform` VARCHAR(45) NOT NULL,
    `subbrandform` VARCHAR(90) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
