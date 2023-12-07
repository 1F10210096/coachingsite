/*
  Warnings:

  - Added the required column `descriptionDetail` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `myProfile` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BosyuuList" ADD COLUMN     "descriptionDetail" TEXT NOT NULL,
ADD COLUMN     "myProfile" TEXT NOT NULL;
