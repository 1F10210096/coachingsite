import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const popRecruitListRepository = {
  fetchinfo: async (): Promise<BosyuuListModel[] | null> => {
    try {
    const allApplies = await prismaClient.apply.findMany({});

    const bosyuuApplyCount: { [bosyuuId: string]: number } = allApplies.reduce((acc, apply) => {
      acc[apply.bosyuuId] = (acc[apply.bosyuuId] || 0) + 1;
      return acc;
    }, {});
    const top25BosyuuIds = Object.entries(bosyuuApplyCount)
      .sort(([, aCount], [, bCount]) => bCount - aCount)
      .slice(0, 25)
      .map(([bosyuuId]) => bosyuuId);

    const top25BosyuuLists = await prismaClient.bosyuuList.findMany({
      where: {
        id: {
          in: top25BosyuuIds,
        },
      },
    });
    console.log(top25BosyuuLists);
    return top25BosyuuLists;
  } catch (e) {
    console.log(e);
  }
  },
};
