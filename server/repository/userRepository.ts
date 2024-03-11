/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable complexity */
import type {
  Favarite,
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
      // ユーザーを取得
      const users = await prismaClient.user.findMany({
        orderBy: {
          rating: 'desc',
        },
        take: 8,
        select: {
          userId: true,
          name: true,
          imageUrl: true,
          myProfile: true,
          rating: true,
          games: true,
          // teacher: { ... }  // ここではteacher関連の情報は省略
        },
      });

      // 各ユーザーに対して関連するapplyの数を集計
      const usersWithApplyCount = await Promise.all(
        users.map(async (user) => {
          const applyCount = await prismaClient.apply.count({
            where: {
              // ここで `apply` がユーザーに関連する条件を指定
              bosyuu: {
                teacherId: user.userId,
              },
            },
          });

          // applyの数を含むユーザー情報を返す
          return {
            ...user,
            applyCount,
          };
        })
      );
      assert(users !== null, 'usersはnullです');
      const userSummaries: UserSummaryModel[] = users.map((user) => ({
        name: user.name,
        imageUrl: user.imageUrl !== null ? user.imageUrl : '', // 明示的なnullチェック
        myProfile: user.myProfile !== null ? user.myProfile : '',
        rating: user.rating !== null ? user.rating : 0,
      }));
      return usersWithApplyCount;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  },
  fetchListinfo2: async (): Promise<UserSummaryModel[] | null> => {
    try {
      const recentBosyuuLists = await prismaClient.bosyuuList.findMany({
        orderBy: { createdAt: 'desc' },
        take: 32, // ユニーク性を確保するため多めに取得
        include: {
          teacher: {
            include: {
              user: true, // 教師に関連するユーザー情報を含める
            },
          },
        },
      });

      // 教師（および関連するユーザー情報）を抽出し、userIdで重複排除
      const uniqueTeachersMap = new Map();
      recentBosyuuLists.forEach(({ teacher }) => {
        if (teacher && teacher.user && !uniqueTeachersMap.has(teacher.userId)) {
          uniqueTeachersMap.set(teacher.userId, {
            ...teacher.user,
            teacherId: teacher.userId, // 教師IDも含める場合
          });
        }
      });

      // Mapからユニークな教師のリストを生成
      const uniqueTeachers = Array.from(uniqueTeachersMap.values());

      console.log(uniqueTeachers);
      // 必要に応じて最初の16名を選択
      return uniqueTeachers.slice(0, 14);
    } catch (error) {
      console.error('Error fetching recent unique teachers with user info:', error);
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
  fetchAllLike: async (Id: string): Promise<Favarite[] | null> => {
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
