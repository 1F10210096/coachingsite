/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable complexity */
import type {
  User,
  User3,
  UserSummaryDetailModel,
  UserSummaryModel,
} from '$/commonTypesWithClient/models';
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
  fetchDetailinfo: async (teacherId: string): Promise<UserSummaryDetailModel | null> => {
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
          teacher: {
            select: {
              Achievements: true,
              hitokoto: true,
            },
          },
        },
      });
      assert(user !== null, 'usersはnullです');

      // You need to handle the possibility that the teacher data might be null
      const userSummary: UserSummaryDetailModel = {
        name: user.name,
        imageUrl: user.imageUrl !== null ? user.imageUrl : '',
        myProfile: user.myProfile !== null ? user.myProfile : '',
        rating: user.rating !== null ? user.rating : 0,
        // Add teacher fields to the response
        Achievements: user.teacher?.Achievements ?? '',
        hitokoto: user.teacher?.hitokoto ?? '',
      };

      return userSummary;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  },
  fetchReview: async (teacherId: string): Promise<UserSummaryDetailModel | null> => {
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
          teacher: {
            select: {
              Achievements: true,
              hitokoto: true,
            },
          },
        },
      });
      assert(user !== null, 'usersはnullです');

      // You need to handle the possibility that the teacher data might be null
      const userSummary: UserSummaryDetailModel = {
        name: user.name,
        imageUrl: user.imageUrl !== null ? user.imageUrl : '',
        myProfile: user.myProfile !== null ? user.myProfile : '',
        rating: user.rating !== null ? user.rating : 0,
        // Add teacher fields to the response
        Achievements: user.teacher?.Achievements ?? '',
        hitokoto: user.teacher?.hitokoto ?? '',
      };

      return userSummary;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  },
  fetchMyProfile: async (userId: string): Promise<User | null> => {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          userId,
        },
        select: {
          userId: true, // userIdを選択に含める
          name: true,
          // imageUrl, myProfile, ratingは選択から除外してもよい
        },
      });
      assert(user !== null, 'User is null');
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },
  fetchMyProfile2: async (userId: string): Promise<User3> => {
    const user = await prismaClient.user.findUnique({
      where: {
        userId,
      },
    });
    assert(user !== null, 'User is null');
    return user;
  },
  sendLike: async (Id: string, myId: string): Promise<void> => {
    const existingLike = await prismaClient.favorite.findFirst({
      where: {
        bosyuuListId: Id,
        studentId: myId,
      },
    });

    if (!existingLike) {
      // いいねが存在しない場合は、新しくいいねを追加
      await prismaClient.favorite.create({
        data: {
          bosyuuListId: Id,
          studentId: myId,
        },
      });
      console.log('いいねを追加しました');
    } else {
      // 既にいいねが存在する場合は、そのいいねを削除
      await prismaClient.favorite.delete({
        where: {
          id: existingLike.id, // 既存のいいねのIDを指定して削除
        },
      });
      console.log('いいねを削除しました');
    }
  },
  fetchAllLike: async (Id: string): Promise<User | null> => {
    try {
      console.log(Id, 'ppppppp');
      const user = await prismaClient.favorite.findMany({
        where: {
          studentId: Id,
        },
      });
      assert(user !== null, 'User is null');
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },
  fetchAllLikes: async (Id: string): Promise<any | null> => {
    try {
      console.log(Id, 'ppppppp');
      const favoritesWithBosyuuList = await prismaClient.favorite.findMany({
        where: {
          studentId: Id,
        },
        include: {
          bosyuuList: {
            include: {
              teacher: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
      console.log(favoritesWithBosyuuList, 'favorites with bosyuuList and imageUrl');
      assert(favoritesWithBosyuuList !== null, 'Favorites with BosyuuList are null');
      return favoritesWithBosyuuList;
    } catch (error) {
      console.error('Error fetching favorites with bosyuuList and imageUrl:', error);
      return null;
    }
  },
};
