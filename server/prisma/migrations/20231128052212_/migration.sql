-- CreateTable
CREATE TABLE "GameRanlPng" (
    "gameId" TEXT NOT NULL,
    "rankName" TEXT NOT NULL,
    "rankIcon" TEXT NOT NULL,

    CONSTRAINT "GameRanlPng_pkey" PRIMARY KEY ("gameId")
);

-- AddForeignKey
ALTER TABLE "GameRanlPng" ADD CONSTRAINT "GameRanlPng_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
