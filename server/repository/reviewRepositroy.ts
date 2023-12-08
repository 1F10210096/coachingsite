import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
export const reviewRepository = {
  fetchinfo: async (Id: string): Promise<BosyuuListModel> => {
    const bosyuuDetail = await prismaClient.apply.findFirst({
      where: { id: Id },
    });

    if (!bosyuuDetail) {
      throw new Error('bosyuuDetail not found');
    }

    return bosyuuDetail;
  },
};
