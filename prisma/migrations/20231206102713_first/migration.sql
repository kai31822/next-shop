-- CreateTable
CREATE TABLE `User` (
    `User_ID` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `address` VARCHAR(191) NULL,
    `phone` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`User_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `Product_ID` VARCHAR(191) NOT NULL,
    `Product_name` VARCHAR(191) NOT NULL,
    `Product_description` VARCHAR(191) NOT NULL,
    `Price` INTEGER NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `Product_quantity` INTEGER NULL,
    `categoryId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`Product_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `productProduct_ID` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
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
ALTER TABLE `Image` ADD CONSTRAINT `Image_productProduct_ID_fkey` FOREIGN KEY (`productProduct_ID`) REFERENCES `Product`(`Product_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

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
