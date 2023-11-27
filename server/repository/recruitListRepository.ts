import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { BosyuuList, Teacher, User } from '@prisma/client';

// PrismaのBosyuuListモデルをBosyuuListModelに変換するヘルパー関数
const toBosyuuListModel = (prismaBosyuuList: BosyuuList,prismaTeacher:Teacher,prismaUser:User): BosyuuListModel => ({
  id: prismaBosyuuList.id,
  gameId: prismaBosyuuList.gameId,
  title: prismaBosyuuList.title,
  rank: prismaBosyuuList.rank,
  subjectRank: prismaBosyuuList.subjectRank,
  role: prismaBosyuuList.role,
  tag: prismaBosyuuList.tag,
  description: prismaBosyuuList.description,
  teacherId: prismaBosyuuList.teacherId,
  createdAt: prismaBosyuuList.createdAt,
  updatedAt: prismaBosyuuList.updatedAt,
  teacher: {
    // ここにTeacher型に合ったプロパティをマッピングする
    userId: prismaTeacher.userId,
    hitokoto: prismaTeacher.hitokoto,
    user: {
      userId: prismaUser.userId,
      name: prismaUser.name,
      imageUrl: null,
      createdAt: new Date(),
      game: undefined,
      studentId: undefined,
      teacherId: undefined,
    },
    bosyuuLists: [],
  },
});
export const recruitListRepository = {
  // eslint-disable-next-line complexity
  fetchinfo: async (params: {
    gameId: string;
    ranks?: string[]; // Changed to "ranks"
    subjectRank?: string[];
    tag?: string[];
    roles?: string[]; // Changed to "roles"
  }): Promise<BosyuuListModel[]> => {
    console.log(params, 'param');
    console.log('recruitListRepository.fetchinfo');
    const query: { [key: string]: any } = {};
    if (params.gameId) {
      query.id = params.gameId;
    }
    const filters = [];
    if (params.ranks) {
      filters.push(...params.ranks.map((rank) => ({ rank: { has: rank } })));
    }
    if (params.subjectRank && params.subjectRank.length > 0) {
      filters.push(
        ...params.subjectRank.map((subjectRank) => ({ subjectRank: { has: subjectRank } }))
      );
    }

    if (params.tag && params.tag.length > 0) {
      filters.push(...params.tag.map((tag) => ({ tag: { has: tag } })));
    }

    if (params.roles) {
      filters.push(...params.roles.map((role) => ({ role: { has: role } })));
    }

    if (filters.length > 0) {
      query.OR = filters;
    }

    console.log('query');

    try {
      const bosyuuLists = await prismaClient.bosyuuList.findMany({ where: query });
      return bosyuuLists.map(toBosyuuListModel);
    } catch (error) {
      console.error('Error fetching recruit list:', error);
      throw error; // Re-throw the error for upstream handling
    }
  },
};
