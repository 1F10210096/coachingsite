/* eslint-disable complexity */
/* eslint-disable max-lines */
import type { BosyuuListModel, BosyuuListModel3, User3, UserImage } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { BosyuuList, Teacher, User } from '@prisma/client';

const toBosyuuListModel = (
  prismaBosyuuList: BosyuuList,
  prismaTeacher: Teacher,
  prismaUser: string
) => ({
  id: prismaBosyuuList.id,
  gameId: prismaBosyuuList.gameId,
  title: prismaBosyuuList.title,
  rank: prismaBosyuuList.rank,
  subjectRank: prismaBosyuuList.subjectRank,
  tag: prismaBosyuuList.tag,
  description: prismaBosyuuList.description,
  suchedule: prismaBosyuuList.suchedule,
  myProfile: prismaBosyuuList.myProfile,
  notes: prismaBosyuuList.notes,
  lessonType: prismaBosyuuList.lessonType,
  createdAt: prismaBosyuuList.createdAt,
  updatedAt: prismaBosyuuList.updatedAt,
  teacher: {
    hitokoto: prismaTeacher.hitokoto,
    user: {
      imageUrl: prismaUser,
    },
    userId: '',
    bosyuuLists: []
  },
  // 他の必要なBosyuuListのフィールド
});

export const recruitListRepository = {
  // eslint-disable-next-line complexity
  fetchinfo: async (params: {
    Id: number;
    ranks?: number[]; // Changed to "ranks"
    subjectRank?: number[];
    tag?: string[];
    lessonTypes?: string[];
  }): Promise<BosyuuListModel3[]> => {
    console.log(params.Id, 'gameId');
    console.log(params, 'param');
    console.log('recruitListRepository.fetchinfo');
    const query: { [key: string]: any } = {};
    if (params.Id) {
      query.gameId = params.Id;
    }
    const filters = [];
    if (params.ranks) {
      filters.push(...params.ranks.map((rank) => ({ rank: { in: [rank] } })));
    }

    if (params.subjectRank && params.subjectRank.length > 0) {
      filters.push(
        ...params.subjectRank.map((subjectRank) => ({ subjectRank: { has: subjectRank } }))
      );
    }

    if (params.tag && params.tag.length > 0) {
      filters.push(...params.tag.map((tag) => ({ tag: { has: tag } })));
    }

    if (params.lessonTypes) {
      filters.push(
        ...params.lessonTypes.map((lessonType) => ({ lessonType: { has: lessonType } }))
      );
    }

    if (filters.length > 0) {
      query.OR = filters;
    }

    try {
      const bosyuuLists = await prismaClient.bosyuuList.findMany({
        where: query,
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
        },
      });
      const models = await Promise.all(
        bosyuuLists.map(async (bosyuuList) => {
          return toBosyuuListModel(bosyuuList, bosyuuList.teacher, bosyuuList.teacher.user.imageUrl ?? 'defaultImageUrl');
        })
      );
      return models;
    } catch (error) {
      console.error('Error fetching recruit list:', error);
      throw error; 
    }
  },
  fetchUserinfo: async (
    name: string,
    rating: string,
    profile: string
  ):Promise<{models:BosyuuListModel3[],user:User3}> => {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          name,
          rating: parseFloat(rating), // ratingを数値に変換
          myProfile: profile,
        },
      });

      if (!user) {
        console.log('User not found');
        return {
          models: [], // 空のBosyuuListModel3配列
          user: {
            userId: 'defaultUserId',
            name: 'defaultName',
            myProfile: 'defaultProfile',
            rating: 3,
            imageUrl:"",
            createdAt:new Date()
            // User3型に必要な他のプロパティも適切に設定
          },  // User3が見つからなかったことを示すためにnullを使用
        };     
      }
      const bosyuuList = await prismaClient.bosyuuList.findMany({
        where: {
          teacherId: user.userId,
        },
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
        },
      });
      const models = await Promise.all(
        bosyuuList.map(async (bosyuuList) => {
          // `findUnique` を使わずに、既に取得した `teacher` と `user` を使用
          return toBosyuuListModel(bosyuuList, bosyuuList.teacher, bosyuuList.teacher.user.imageUrl ?? 'defaultImageUrl');
        })
      );
      console.log(user, 'user');
      return {models, user};
    } catch (error) {
      console.error('Error fetching recruit list:', error);
      throw error; // Re-throw the error for upstream handling
    }
  },
  fetchAllInfo: async (): Promise<BosyuuListModel3[]> => {
    try {
      const bosyuuList = await prismaClient.bosyuuList.findMany({
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
        },
      });
      const models = await Promise.all(
        bosyuuList.map(async (bosyuuList) => {

          return toBosyuuListModel(bosyuuList, bosyuuList.teacher, bosyuuList.teacher.user.imageUrl ?? 'defaultImageUrl');
        })
      );
      return models;
    } catch (error) {
      console.error('Error fetching recruit list:', error);
      throw error; // Re-throw the error for upstream handling
    }
  },
  fetchCategoriesRecruit: async (Id: string): Promise<BosyuuListModel3[]> => {
    try {
      console.log(Id, 'Id')
      const gamesInSameGenre = await prismaClient.gameList.findMany({
        where: {
          genre: Id,
        },
        select: {
          id: true,
        },
      });
      console.log(gamesInSameGenre, 'gamesInSameGenre');
  
      // 取得したゲームIDに一致する募集リストを取得
      const bosyuuLists = await prismaClient.bosyuuList.findMany({
        where: {
          gameId: {
            in: gamesInSameGenre.map(g => g.id),
          },
        },
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
        },
      });
  
      const models = bosyuuLists.map(bosyuuList => {
        return toBosyuuListModel(bosyuuList, bosyuuList.teacher, bosyuuList.teacher.user.imageUrl ?? 'defaultImageUrl');
      });

      console.log(models, 'wwwwwmodels'); 
  
      return models;
    } catch (error) {
      console.error('Error fetching recruit list:', error);
      throw error; // Re-throw the error for upstream handling
    }
  },
};
