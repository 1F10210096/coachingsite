-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "bosyuuListId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_bosyuuListId_fkey" FOREIGN KEY ("bosyuuListId") REFERENCES "BosyuuList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
