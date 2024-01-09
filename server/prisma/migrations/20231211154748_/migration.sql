/*
  Warnings:

  - You are about to drop the column `applyId` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_applyId_fkey";

-- DropIndex
DROP INDEX "Room_applyId_key";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "applyId";
