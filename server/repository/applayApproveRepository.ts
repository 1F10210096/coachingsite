import type { Application } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const applyApproveRepository = async (id: string): Promise<Application> => {
  try {
    // prismaを使用して、指定されたidに一致するapplyを取得
    const application = await prismaClient.apply.findFirst({
      where: {
        roomId: id,
      },
    });

    if (!application) {
      throw new Error('Application not found');
    }

    // applyが見つかり、状態が 'wait' ならば、そのapplyを返す
    if (application.status === 'wait') {
      return application;
    } else {
      throw new Error('Application is not in wait status');
    }
  } catch (error) {
    console.error('Error fetching application:', error);
    // エラーハンドリングを適切に行う
    throw error;
  }
};
