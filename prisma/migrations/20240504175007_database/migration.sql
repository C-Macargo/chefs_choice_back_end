-- CreateEnum
CREATE TYPE "TimeOfDay" AS ENUM ('DAY', 'NIGHT');

-- CreateEnum
CREATE TYPE "DietaryPreference" AS ENUM ('VEGAN', 'VEGETARIAN', 'CONTAINS_DAIRY');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ENTREE', 'MAIN_DISH', 'DESSERT');

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "plate_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "timeOfDay" "TimeOfDay" NOT NULL,
    "dietary_preference" "DietaryPreference",
    "category" "Category" NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_plate_name_key" ON "Menu"("plate_name");
