-- AddForeignKey
ALTER TABLE "BosyuuList" ADD CONSTRAINT "BosyuuList_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "GameList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
