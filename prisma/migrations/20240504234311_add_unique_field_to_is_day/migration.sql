/*
  Warnings:

  - A unique constraint covering the columns `[isDay]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Menu_isDay_key" ON "Menu"("isDay");
