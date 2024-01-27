import type { Name, UserSummaryModel } from '$/commonTypesWithClient/models';
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
  fetchReview: async (teacherId: string): Promise<UserSummaryModel> => {
    console.log('gameListUsecase.fetchinfo');
    console.log('teacherId', teacherId);
    const userDetail = await userRepository.fetchReview(teacherId);
    assert(userDetail !== null, 'userDetailはnullです');
    return userDetail;
  },
  fetchMyProfile: async (userId: string): Promise<Name> => {
    console.log('gameListUsecase.fetchinfo');
    console.log('userId', userId);
    const userDetail = await userRepository.fetchMyProfile(userId);
    assert(userDetail !== null, 'userDetailはnullです');
    return userDetail;
  },
};
