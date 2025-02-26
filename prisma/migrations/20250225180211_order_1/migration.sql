/*
  Warnings:

  - You are about to drop the column `phoneCode` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `postal` on the `OrderAddress` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "phoneCode",
DROP COLUMN "postal",
ADD COLUMN     "postalCode" TEXT NOT NULL;
