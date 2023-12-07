/*
  Warnings:

  - The `subjectRank` column on the `BosyuuList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `rank` on the `BosyuuList` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rank` on the `userGameRank` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BosyuuList" DROP COLUMN "rank",
ADD COLUMN     "rank" INTEGER NOT NULL,
DROP COLUMN "subjectRank",
ADD COLUMN     "subjectRank" INTEGER[];

-- AlterTable
ALTER TABLE "userGameRank" DROP COLUMN "rank",
ADD COLUMN     "rank" INTEGER NOT NULL;
