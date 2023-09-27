import type { UserSummaryModel } from '$/commonTypesWithClient/models';
import { userRepository } from '$/repository/userRepository';
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
    console.log('teacherId', teacherId);
    const userDetail = await userRepository.fetchDetailinfo(teacherId);
    assert(userDetail !== null, 'userDetailはnullです');
    return userDetail;
  },
};