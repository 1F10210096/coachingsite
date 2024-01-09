import { prismaClient } from '$/service/prismaClient';
import type { User } from '@prisma/client';

export const approveRepository = async (
  Id: string,
  bosyuuId: string,
  roomId: string,
  userId: string
): Promise<User | null> => {
  try {
    console.log('userMyRepository');
    console.log('Id', Id);
    console.log('bosyuuId', bosyuuId);
    console.log('roomId', roomId);
    console.log('userId', userId);

    // 条件に一致する応募を検索
    const applications = await prismaClient.room.findMany({
      where: {
        id: roomId,
        hostId: userId,
      },
    });
    console.log('applications', applications[0].bosyuuId);

    // 最初の応募のステータスを更新（該当する応募がある場合）
    if (applications.length > 0) {
      await prismaClient.room.update({
        where: {
          id: applications[0].id,
        },
        data: {
          status: '応募済み',
        },
      });
      console.log(bosyuuId);
      const application = await prismaClient.apply.create({
        data: {
          bosyuuId: applications[0].bosyuuId,
          studentId: applications[0].participantId,
          status: '応募済み',
          // 必要に応じて任意フィールドもここに追加
        },
      });

      console.log('application', application);

      console.log('Application status updated to 応募済み');
      return applications[0];
    } else {
      console.log('No application found to update');
      return null;
    }
  } catch (error) {
    console.error('Error in approveRepository:', error);
    return null;
  }
};
