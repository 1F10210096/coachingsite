/*
  Warnings:

  - The primary key for the `GameList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `GameRankPng` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gameRank` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `gameId` on the `BosyuuList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `GameList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BosyuuList" DROP CONSTRAINT "BosyuuList_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameRankPng" DROP CONSTRAINT "GameRankPng_gameId_fkey";

-- DropForeignKey
ALTER TABLE "gameRank" DROP CONSTRAINT "gameRank_userId_fkey";

-- AlterTable
ALTER TABLE "BosyuuList" DROP COLUMN "gameId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GameList" DROP CONSTRAINT "GameList_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "GameList_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "GameRankPng";

-- DropTable
DROP TABLE "gameRank";

-- CreateTable
CREATE TABLE "userGameRank" (
    "userId" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "rank" TEXT NOT NULL,

    CONSTRAINT "userGameRank_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "GameRanksList" (
    "id" TEXT NOT NULL,
    "gameId" INTEGER NOT NULL,
    "rankName" TEXT NOT NULL,

    CONSTRAINT "GameRanksList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userGameRank" ADD CONSTRAINT "userGameRank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userGameRank" ADD CONSTRAINT "userGameRank_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BosyuuList" ADD CONSTRAINT "BosyuuList_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameRanksList" ADD CONSTRAINT "GameRanksList_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
