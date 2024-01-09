/* eslint-disable complexity */
import type { UserSummaryDetailModel, UserSummaryModel } from '$/commonTypesWithClient/models';
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
  fetchMyProfile: async (userId: string): Promise<UserSummaryDetailModel | null> => {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          userId,
        },
        select: {
          name: true,
          imageUrl: false,
          myProfile: false,
          rating: false,
        },
      });
      assert(user !== null, 'usersはnullです');

      return user;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  },
};
