import type { GameListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { GameList } from '@prisma/client';

const toGameListModel = (prismaGameList: GameList): GameListModel => ({
  id: prismaGameList.id,
  title: prismaGameList.title,
});

export const gameListRepository = {
  fetchinfo: async (): Promise<GameListModel[] | null> => {
    console.log('gameListRepository.fetchinfo');
    const topGameIds = await prismaClient.bosyuuList.groupBy({
      by: ['gameId'],
      _count: {
        gameId: true,
      },
      orderBy: {
        _count: {
          gameId: 'desc',
        },
      },
      take: 5,
    });

    // 上位6つのGameListを取得
    const topGames = await Promise.all(
      topGameIds.map((group) =>
        prismaClient.gameList.findUnique({
          where: { id: group.gameId },
        })
      )
    );
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!topGames) {
      throw new Error('games not found');
    }
    console.log(topGames);

    return topGames.filter((game): game is GameList => game !== null).map(toGameListModel);
  },
  fetchCategories: async (id: string): Promise<GameListModel[] | null> => {
    console.log('gameListRepository.fetchCategories');
    const gameList = await prismaClient.gameList.findMany({
      where: { genre: id },
    });
    return gameList.filter((game): game is GameList => game !== null).map(toGameListModel);
  }
};
