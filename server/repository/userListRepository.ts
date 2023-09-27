import type { UserSummaryModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import assert from 'assert';

export const userRepository = {
  fetchListinfo: async (): Promise<UserSummaryModel[] | null> => {
    try {
      const users = await prismaClient.user.findMany({
        orderBy: {
          rating: 'desc',
        },
        take: 5,
        select: {
          name: true,
          imageUrl: true,
          myProfile: true,
          rating: true,
        },
      });
      assert(users !== null, 'usersはnullです');
      const userSummaries: UserSummaryModel[] = users.map((user) => ({
        name: user.name,
        imageUrl: user.imageUrl !== null ? user.imageUrl : '', // 明示的なnullチェック
        myProfile: user.myProfile !== null ? user.myProfile : '',
        rating: user.rating !== null ? user.rating : 0,
      }));

      return userSummaries;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  },
  fetchDetailinfo: async (teacherId: string): Promise<UserSummaryModel | null> => {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          userId: teacherId,
        },
        select: {
          name: true,
          imageUrl: true,
          myProfile: true,
          rating: true,
        },
      });
      const userSummary: UserSummaryModel = {
        name: user.name,
        imageUrl: user.imageUrl !== null ? user.imageUrl : '', // 明示的なnullチェック
        myProfile: user.myProfile !== null ? user.myProfile : '',
        rating: user.rating !== null ? user.rating : 0,
      };

      return userSummary;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  },
};
