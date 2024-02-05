/*
  Warnings:

  - You are about to drop the column `roomId` on the `Room` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `apply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomId";

-- AlterTable
ALTER TABLE "apply" ADD COLUMN     "roomId" TEXT NOT NULL;
