/*
  Warnings:

  - Added the required column `genre` to the `GameList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameList" ADD COLUMN     "genre" TEXT NOT NULL;
