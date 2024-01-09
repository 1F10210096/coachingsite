/*
  Warnings:

  - Added the required column `status` to the `apply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apply" ADD COLUMN     "status" TEXT NOT NULL;
