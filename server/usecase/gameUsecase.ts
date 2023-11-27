
import type { GameListModel } from '$/commonTypesWithClient/models';
import { gameListRepository } from '$/repository/gameListRepository';

import assert from 'assert';
export const gameListUsecase = {
  fetchinfo: async (): Promise<GameListModel[]> => {
    console.log('gameListUsecase.fetchinfo');
    const gameList = await gameListRepository.fetchinfo();
    assert(gameList !== null, 'gameListはnullです');
    return gameList;
  },
};