/* eslint-disable complexity */
import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
/* eslint-disable complexity */
// New type excluding the 'teacherId' field
type BosyuuListModelWithoutTeacherId = Omit<BosyuuListModel, 'teacherId'>;

export const recruitDetailRepository = {
  fetchinfo: async (Id: string): Promise<BosyuuListModelWithoutTeacherId> => {
    try {
      const bosyuuDetail = await prismaClient.bosyuuList.findFirst({
        where: {
          id: Id,
        },
        select: {
          id: true,
          gameId: true,
          title: true,
          rank: true,
          subjectRank: true,
          tag: true,
          lessonType: true,
          description: true,
          notes: true,
          myProfile: true,
          descriptionDetail: true,
          suchedule: true,
          createdAt: true,
          updatedAt: true,
          game: true,
          apply: true,
          rooms: true,
          teacher: {
            select: {
              user: {
                select: {
                  name: true,
                  myProfile: true,
                  rating: true,
                  imageUrl: true,
                },
              },
            },
          },
        },
      });
      cosnole.log('bosyuuDetail', bosyuuDetail);  
      return bosyuuDetail;
    } catch (error) {
      console.error('Error fetching teacher details:', error);
      return null;
    }
  },
};
