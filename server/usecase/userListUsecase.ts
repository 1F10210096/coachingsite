import type { UserSummaryModel } from '$/commonTypesWithClient/models';
import { userRepository } from '$/repository/userListRepository';
import assert from 'assert';
export const userUsecase = {
  fetchListinfo: async (): Promise<UserSummaryModel[]> => {
    console.log('gameListUsecase.fetchinfo');
    const gameList = await userRepository.fetchListinfo();
    assert(gameList !== null, 'gameListはnullです');
    return gameList;
  },
  fetchDetailinfo: async (teacherId: string): Promise<UserSummaryModel> => {
    console.log('gameListUsecase.fetchinfo');
    const gameList = await userRepository.fetchDetailinfo(teacherId);
    assert(gameList !== null, 'gameListはnullです');
    return gameList[0];
  },
};
