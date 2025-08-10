/*
  Warnings:

  - You are about to drop the column `broad_channel` on the `channel_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `channel` on the `channel_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `BE` on the `store_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `New_Branch` on the `store_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `SM` on the `store_mapping` table. All the data in the column will be lost.
  - You are about to drop the column `STL` on the `store_mapping` table. All the data in the column will be lost.
  - Added the required column `base_channel` to the `channel_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel_desc` to the `channel_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ASM` to the `store_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Branch` to the `store_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RSM` to the `store_mapping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TSI` to the `store_mapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `channel_mapping` DROP COLUMN `broad_channel`,
    DROP COLUMN `channel`,
    ADD COLUMN `base_channel` VARCHAR(45) NOT NULL,
    ADD COLUMN `channel_desc` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `store_mapping` DROP COLUMN `BE`,
    DROP COLUMN `New_Branch`,
    DROP COLUMN `SM`,
    DROP COLUMN `STL`,
    ADD COLUMN `ASM` VARCHAR(45) NOT NULL,
    ADD COLUMN `Branch` VARCHAR(45) NOT NULL,
    ADD COLUMN `RSM` VARCHAR(45) NOT NULL,
    ADD COLUMN `TSI` VARCHAR(45) NOT NULL;
