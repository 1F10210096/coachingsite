import { prismaClient } from '$/service/prismaClient';

export const commentRepository = async (roomId, userId, content) => {
  try {
    const newComment = await prismaClient.comment.create({
      data: {
        roomId,
        userId,
        content,
      },
    });
    return newComment;
  } catch (error) {
    console.error('コメントの作成に失敗しました:', error);
    return null;
  }
};
