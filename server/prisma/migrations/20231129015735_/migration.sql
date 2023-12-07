/*
  Warnings:

  - You are about to drop the column `LessonType` on the `BosyuuList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BosyuuList" DROP COLUMN "LessonType",
ADD COLUMN     "lessonType" TEXT[];
