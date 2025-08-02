/*
  Warnings:

  - Added the required column `brand` to the `product_mapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_mapping` ADD COLUMN `brand` VARCHAR(45) NOT NULL;
