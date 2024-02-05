import type { Application } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const approveRepository = async (
  Id: string,
  bosyuuId: string,
  roomId: string,
  userId: string
): Promise<Application | null> => {
  try {
    console.log('userMyRepository');
    console.log('Id', Id);
    console.log('bosyuuId', bosyuuId);
    console.log('roomId', roomId);
    console.log('userId', userId);

    // 条件に一致する応募を検索
    const applications = await prismaClient.apply.findMany({
      where: {
        roomId,
      },
    });
    console.log('applications', applications[0].bosyuuId);

    // 最初の応募のステータスを更新（該当する応募がある場合）
    if (applications.length > 0) {
      console.log(applications);
      console.log('Ddgrdgd');
      const a = await prismaClient.apply.update({
        where: {
          id: applications[0].id,
        },
        data: {
          status: '応募済み',
        },
      });
      console.log(a);

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
