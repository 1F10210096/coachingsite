import type { UserSummaryModel } from '$/commonTypesWithClient/models';
import { userListRepository } from '$/repository/userListRepository';
import assert from 'assert';
export const userListUsecase = {
  fetchinfo: async (): Promise<UserSummaryModel[]> => {
    console.log('gameListUsecase.fetchinfo');
    const gameList = await userListRepository.fetchinfo();
    assert(gameList !== null, 'gameListはnullです');
    return gameList;
  },
};
