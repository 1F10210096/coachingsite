import type { Application } from '$/commonTypesWithClient/models'; // 適切なパス修正してください
import { prismaClient } from '$/service/prismaClient';


export const applayRepository = async (
  bosyuuId: string,
  roomId: string,
  userId: string,
  date: string,
  time: string
): Promise<Application | null> => {
  try {
    console.log('dawdadsaddw');
    // まず指定されたroomIdでRoomを検索します
    const room = await prismaClient.room.findUnique({
      where: {
        id: roomId,
      },
    });

    console.log(bosyuuId);
    // roomIdとuserIdが一致するRoomが見つかったかチェックします
    if (room && room.participantId === userId) {
      // 条件に一致した場合、新しいapplyレコードを作成します
      const newApplication = await prismaClient.apply.create({
        data: {
          bosyuuId,
          roomId,
          studentId: userId, // ここでuserIdがstudentIdになると仮定しています
          status: 'wait', // 適切な初期ステータスを設定してください
          date, // 適切な日付を設定してください
          time, // 適切な時間を設定してください
          // ratingとreviewは初期値を持たないかもしれません
        },
      });

      return newApplication;
    }

    // 条件に一致しない場合はnullを返します
    return null;
  } catch (error) {
    console.error('Error in approveRepository:', error);
    throw error;
  }
};
