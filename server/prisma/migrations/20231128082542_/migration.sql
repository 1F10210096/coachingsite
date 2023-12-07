/*
  Warnings:

  - You are about to drop the `GameRanlPng` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GameRanlPng" DROP CONSTRAINT "GameRanlPng_gameId_fkey";

-- DropTable
DROP TABLE "GameRanlPng";

-- CreateTable
CREATE TABLE "GameRankPng" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "rankName" TEXT NOT NULL,
    "rankIcon" TEXT NOT NULL,

    CONSTRAINT "GameRankPng_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameRankPng" ADD CONSTRAINT "GameRankPng_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
