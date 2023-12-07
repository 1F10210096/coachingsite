import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
export const recruitDetailRepository = {
  fetchinfo: async (Id: string): Promise<BosyuuListModel> => {
    const bosyuuDetail = await prismaClient.bosyuuList.findFirst({
      where: { id: Id },
    });

    if (!bosyuuDetail) {
      throw new Error('bosyuuDetail not found');
    }

    return bosyuuDetail;
  },
};
