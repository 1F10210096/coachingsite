import type { Application } from '$/commonTypesWithClient/models'; // 適切なパスに修正してください
import { prismaClient } from '$/service/prismaClient';

export const applyApproveRepository = async (id: string): Promise<Application | null> => {
  try {
    console.log('adwdggdgjjjjharagahetta');
    // prismaを使用して、指定されたidに一致するapplyを取得
    const application = await prismaClient.apply.findFirst({
      where: {
        roomId: id,
      },
    });

    // applyが見つかり、状態が 'wait' ならば、そのapplyを返す
    if (application.status === 'wait') {
      return application;
    } else {
      // 条件に一致しない場合はnullを返す
      return null;
    }
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
};
