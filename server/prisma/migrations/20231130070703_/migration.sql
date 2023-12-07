/*
  Warnings:

  - You are about to drop the column `rankName` on the `GameRanksList` table. All the data in the column will be lost.
  - Added the required column `rankId` to the `GameRanksList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameRanksList" DROP COLUMN "rankName",
ADD COLUMN     "rankId" INTEGER NOT NULL;
