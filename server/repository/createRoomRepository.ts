import type { RoomWithoutHostId } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import assert from 'assert';

export const createRoomRepository = {
  fetchOrCreateRoom: async (
    bosyuuId: string,
    participantId: string
  ): Promise<RoomWithoutHostId> => {
      console.log('createU');

      // 既存の Room を検索
      let room = await prismaClient.room.findFirst({
        where: {
          bosyuuId,
          participantId,
        },
      });
      console.log('room', room);
      // Room が見つからない場合、新しい Room を作成
      if (!room) {
        const bosyuu = await prismaClient.bosyuuList.findUnique({
          where: { id: bosyuuId },
        });

        console.log('bosyuu', bosyuu);
        assert(bosyuu !== null, 'bosyuuはnullです');

        console.log('bosyuu.teacherId', bosyuu.teacherId);
        console.log('bosyuuId', bosyuuId);
        console.log('participantId', participantId);
        room = await prismaClient.room.create({
          data: {
            bosyuuId,
            hostId: bosyuu.teacherId, // BosyuuList の teacherId を hostId として設定
            participantId,
            status: 'waiting',
            createdAt: new Date(),
          },
        });
        console.log('room', room);
      }

      const { hostId, ...roomWithoutHostId } = room;
      return roomWithoutHostId;
  },
};
