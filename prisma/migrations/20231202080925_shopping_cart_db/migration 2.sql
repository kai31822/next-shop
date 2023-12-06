/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - The required column `User_ID` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `User_ID` VARCHAR(191) NOT NULL,
    ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `phone` INTEGER NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD PRIMARY KEY (`User_ID`);

-- CreateTable
CREATE TABLE `Product` (
    `Product_ID` VARCHAR(191) NOT NULL,
    `Product_name` VARCHAR(191) NOT NULL,
    `Product_description` VARCHAR(191) NOT NULL,
    `Price` INTEGER NOT NULL,
    `Image` VARCHAR(191) NULL,
    `Product_quantity` INTEGER NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Product_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `Order_ID` VARCHAR(191) NOT NULL,
    `Order_status` ENUM('Padding', 'Done') NOT NULL,
    `UserID` VARCHAR(191) NULL,
    `Express_Address` VARCHAR(191) NULL,
    `Order_Email` VARCHAR(191) NULL,
    `Order_Phone` INTEGER NULL,
    `Order_City` VARCHAR(191) NULL,
    `Order_Postal_code` VARCHAR(191) NULL,
    `Order_Express_cost` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Order_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `Cart_ID` VARCHAR(191) NOT NULL,
    `UserID` VARCHAR(191) NULL,
    `guest` VARCHAR(191) NULL,
    `OrderID` VARCHAR(191) NULL,
    `Order_Date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Cart_UserID_key`(`UserID`),
    UNIQUE INDEX `Cart_OrderID_key`(`OrderID`),
    PRIMARY KEY (`Cart_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Details` (
    `Order_ID` VARCHAR(191) NOT NULL,
    `CartCart_ID` VARCHAR(191) NULL,
    `Product_ID` VARCHAR(191) NULL,
    `Quantity` INTEGER NOT NULL,

    PRIMARY KEY (`Order_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `User`(`User_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_OrderID_fkey` FOREIGN KEY (`OrderID`) REFERENCES `Order`(`Order_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Details` ADD CONSTRAINT `Details_CartCart_ID_fkey` FOREIGN KEY (`CartCart_ID`) REFERENCES `Cart`(`Cart_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Details` ADD CONSTRAINT `Details_Product_ID_fkey` FOREIGN KEY (`Product_ID`) REFERENCES `Product`(`Product_ID`) ON DELETE SET NULL ON UPDATE CASCADE;
