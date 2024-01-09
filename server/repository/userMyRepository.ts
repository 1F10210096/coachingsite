import { prismaClient } from '$/service/prismaClient';
import type { User } from '@prisma/client';

export const userMyRepository = async (userId: string): Promise<User | null> => {
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
      // 必要に応じて他のフィールドや関連を指定
    });
    return { user, user2 };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};