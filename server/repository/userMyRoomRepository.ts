import type { RoomWithoutHostId } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const userMyRoomRepository = async (userId: string): Promise<RoomWithoutHostId[] | null> => {
  try {
    console.log('userMyRepository');
    console.log('userId', userId);
    const user = await prismaClient.room.findMany({
      where: {
        bosyuuId: userId,
      },
      // 必要に応じて他のフィールドや関連を指定
    });
    console.log('user', user);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
