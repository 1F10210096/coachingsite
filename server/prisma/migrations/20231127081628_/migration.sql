/*
  Warnings:

  - You are about to drop the column `role` on the `BosyuuList` table. All the data in the column will be lost.
  - Added the required column `OneWord` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suchedule` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BosyuuList" DROP COLUMN "role",
ADD COLUMN     "OneWord" TEXT NOT NULL,
ADD COLUMN     "suchedule" TEXT NOT NULL;
