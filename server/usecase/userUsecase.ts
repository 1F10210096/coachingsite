import type { Name, UserModel2, UserSummaryModel } from '$/commonTypesWithClient/models';
import { userRepository } from '$/repository/userRepository';
import { prismaClient } from '$/service/prismaClient';
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
  fetchList: async (): Promise<UserModel2[]> => {
    console.log('gameListUsecase.fetchCategories');
    const newUser = await prismaClient.user.findMany();
    console.log(newUser, 'dasdafa');
    return newUser;
  },
  update: async (
    userId: string,
    name: string,
    myProfile: string,
    rating: number,
    imageUrl: string
  ) => {
    console.log('gameListUsecase.fetchCategories');
    try {
      const updatedUser = await prismaClient.user.update({
        where: {
          userId, // 更新するユーザーのIDを指定
        },
        data: {
          name, // 更新する名前
          myProfile, // 更新するプロフィール
          rating, // 更新する評価
          imageUrl, // 更新する画像URL
        },
      });
      console.log(updatedUser, 'Update successful');
      return updatedUser;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error; // エラーを呼び出し元に伝播させる
    }
  },
};
