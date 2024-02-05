import type { NewApp, UserListItem } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const userMyRepository = async (
  userId: string
): Promise<{ user: UserListItem[]; user2: NewApp[] } | null> => {
  try {
    console.log('userMyRepository');
    console.log('userId', userId);
    const user = await prismaClient.bosyuuList.findMany({
      where: {
        teacherId: userId,
      },
      // 必要に応じて他のフィールドや関連を指定
    });
    console.log('user', user);
    const user2 = await prismaClient.apply.findMany({
      where: {
        studentId: userId,
      },
      include: {
        bosyuu: true, // 関連するBosyuuListデータを含む
        student: true, // 関連するStudentデータを含む
      },
    });
    return { user, user2 };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
