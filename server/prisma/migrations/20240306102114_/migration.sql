-- AlterTable
ALTER TABLE "User" ADD COLUMN "games" TEXT;
ALTER TABLE "User" ALTER COLUMN "games" DROP NOT NULL;
