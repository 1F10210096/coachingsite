import type { newBosyuu } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const popRecruitListRepository = {
  fetchinfo: async (): Promise<newBosyuu[] | null> => {
    try {
      const allApplies = await prismaClient.apply.findMany({});
      const bosyuuApplyCount: { [bosyuuId: string]: number } = allApplies.reduce((acc, apply) => {
        acc[apply.bosyuuId] = (acc[apply.bosyuuId] || 0) + 1;
        return acc;
      }, {} as { [bosyuuId: string]: number });

      const top25BosyuuIds = Object.entries(bosyuuApplyCount)
        .sort(([, aCount], [, bCount]) => bCount - aCount)
        .slice(0, 25)
        .map(([bosyuuId]) => bosyuuId);

      // ここで top25BosyuuLists を取得する際に、それに対応する user の imageUrl も含めます
      const top25BosyuuLists = await prismaClient.bosyuuList.findMany({
        where: {
          id: {
            in: top25BosyuuIds,
          },
        },
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  myProfile:true,
                  imageUrl: true, // 必要な user 情報のみを選択する
                },
              },
            },
          },
        },
      });

      console.log(top25BosyuuLists);
      return top25BosyuuLists.map((bosyuu) => ({
        ...bosyuu,
        user: bosyuu.teacher.user,
      }));
    } catch (error) {
      console.error('Error fetching bosyuu lists with user images:', error);
      return null;
    }
  },
  fetchAllinfo: async (): Promise<newBosyuu[] | null> => {
    const allApplies = await prismaClient.bosyuuList.findMany({});
    return allApplies;
  },
};
