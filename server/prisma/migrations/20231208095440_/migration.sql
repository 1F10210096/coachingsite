/*
  Warnings:

  - Added the required column `review` to the `apply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apply" ADD COLUMN     "review" TEXT NOT NULL;
