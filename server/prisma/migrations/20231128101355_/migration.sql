/*
  Warnings:

  - You are about to drop the column `icon` on the `GameList` table. All the data in the column will be lost.
  - You are about to drop the column `rankIcon` on the `GameRankPng` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameList" DROP COLUMN "icon";

-- AlterTable
ALTER TABLE "GameRankPng" DROP COLUMN "rankIcon";
