/*
  Warnings:

  - You are about to drop the column `OrderID` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `productProduct_ID` on the `Image` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Order_ID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `Order_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `UserID` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Product_ID` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Product_description` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Product_name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `Product_quantity` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[paymentIntentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `colorCode` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliverStatus` to the `Order` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `paymentIntentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Product` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `inStock` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Cart` DROP FOREIGN KEY `Cart_OrderID_fkey`;

-- DropForeignKey
ALTER TABLE `Details` DROP FOREIGN KEY `Details_Product_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_productProduct_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_UserID_fkey`;

-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `OrderID`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `productProduct_ID`,
    ADD COLUMN `colorCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `productProduct_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Order` DROP PRIMARY KEY,
    DROP COLUMN `Order_ID`,
    DROP COLUMN `Order_status`,
    DROP COLUMN `UserID`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `deliverStatus` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `paymentIntentId` VARCHAR(191) NOT NULL,
    ADD COLUMN `productId` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `user` VARCHAR(191) NOT NULL,
    MODIFY `Order_Express_cost` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Product` DROP PRIMARY KEY,
    DROP COLUMN `Price`,
    DROP COLUMN `Product_ID`,
    DROP COLUMN `Product_description`,
    DROP COLUMN `Product_name`,
    DROP COLUMN `Product_quantity`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `inStock` BOOLEAN NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Order_paymentIntentId_key` ON `Order`(`paymentIntentId`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productProduct_id_fkey` FOREIGN KEY (`productProduct_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_fkey` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Details` ADD CONSTRAINT `Details_Product_ID_fkey` FOREIGN KEY (`Product_ID`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
