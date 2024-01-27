/*
  Warnings:

  - Added the required column `date` to the `apply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `apply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apply" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;
