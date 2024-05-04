/*
  Warnings:

  - You are about to drop the column `category` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `dietary_preference` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `plate_name` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `timeOfDay` on the `Menu` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Menu` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isDay` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Menu_plate_name_key";

-- AlterTable
ALTER TABLE "Menu" DROP COLUMN "category",
DROP COLUMN "created_at",
DROP COLUMN "dietary_preference",
DROP COLUMN "image_url",
DROP COLUMN "plate_name",
DROP COLUMN "price",
DROP COLUMN "timeOfDay",
DROP COLUMN "updated_at",
ADD COLUMN     "isDay" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropEnum
DROP TYPE "Category";

-- DropEnum
DROP TYPE "DietaryPreference";

-- DropEnum
DROP TYPE "TimeOfDay";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "image_url" TEXT,
    "menuId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductCategories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategories_AB_unique" ON "_ProductCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategories_B_index" ON "_ProductCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_name_key" ON "Menu"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
