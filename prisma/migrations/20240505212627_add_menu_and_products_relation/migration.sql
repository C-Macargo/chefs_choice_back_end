/*
  Warnings:

  - You are about to drop the column `menuId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_menuId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "menuId";

-- CreateTable
CREATE TABLE "MenuProducts" (
    "menuId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "MenuProducts_pkey" PRIMARY KEY ("menuId","productId")
);

-- CreateTable
CREATE TABLE "_MenuProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuProducts_AB_unique" ON "_MenuProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuProducts_B_index" ON "_MenuProducts"("B");

-- AddForeignKey
ALTER TABLE "MenuProducts" ADD CONSTRAINT "MenuProducts_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuProducts" ADD CONSTRAINT "MenuProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuProducts" ADD CONSTRAINT "_MenuProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuProducts" ADD CONSTRAINT "_MenuProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
