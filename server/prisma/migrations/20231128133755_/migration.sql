/*
  Warnings:

  - The `LessonType` column on the `BosyuuList` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "BosyuuList" DROP COLUMN "LessonType",
ADD COLUMN     "LessonType" TEXT[];
