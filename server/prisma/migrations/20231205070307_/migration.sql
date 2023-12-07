-- CreateTable
CREATE TABLE "apply" (
    "id" TEXT NOT NULL,
    "bosyuuId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "apply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apply_bosyuuId_key" ON "apply"("bosyuuId");

-- CreateIndex
CREATE UNIQUE INDEX "apply_studentId_key" ON "apply"("studentId");

-- AddForeignKey
ALTER TABLE "apply" ADD CONSTRAINT "apply_bosyuuId_fkey" FOREIGN KEY ("bosyuuId") REFERENCES "BosyuuList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apply" ADD CONSTRAINT "apply_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
