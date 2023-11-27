import type { GameListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { GameList } from '@prisma/client';

const toCompanyModel = (prismaGameList: GameList): GameListModel => ({
  id: prismaGameList.id,
  title: prismaGameList.title,
  icon: prismaGameList.icon,
});

export const gameListRepository = {
  save: async (gameList: GameListModel) => {
    await prismaClient.gameList.upsert({
      where: { id: gameList.id },
      update: {
        title: gameList.title,
        icon: gameList.icon,
      },
      create: {
        id: gameList.id,
        title: gameList.title,
        icon: gameList.icon,
      },
    });
  },

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
      take: 6,
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

    return topGames.filter((game): game is GameList => game !== null).map(toCompanyModel);
  },
};
