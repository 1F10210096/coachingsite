/*
  Warnings:

  - Added the required column `role` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectRank` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BosyuuList" ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "subjectRank" TEXT NOT NULL,
ADD COLUMN     "tag" TEXT NOT NULL;
