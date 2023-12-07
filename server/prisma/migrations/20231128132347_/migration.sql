/*
  Warnings:

  - You are about to drop the column `OneWord` on the `BosyuuList` table. All the data in the column will be lost.
  - Added the required column `LessonType` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notes` to the `BosyuuList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BosyuuList" DROP COLUMN "OneWord",
ADD COLUMN     "LessonType" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT NOT NULL;
