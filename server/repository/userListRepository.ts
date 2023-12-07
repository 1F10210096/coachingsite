import type { UserSummaryModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const userListRepository = {
  fetchinfo: async (): Promise<UserSummaryModel[] | null> => {
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
};
