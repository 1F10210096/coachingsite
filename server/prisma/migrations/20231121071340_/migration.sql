/*
  Warnings:

  - The `rank` column on the `BosyuuList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `BosyuuList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subjectRank` column on the `BosyuuList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tag` column on the `BosyuuList` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BosyuuList" DROP COLUMN "rank",
ADD COLUMN     "rank" TEXT[],
DROP COLUMN "role",
ADD COLUMN     "role" TEXT[],
DROP COLUMN "subjectRank",
ADD COLUMN     "subjectRank" TEXT[],
DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[];
