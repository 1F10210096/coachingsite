import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const roomRepository = {
  fetchRoom: async (roomId: string, userId: string) => {
    console.log('r ', roomId);
    // 指定されたIDでRoomを検索し、Participantが一致するか確認
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
      },
      include: {
        Comment: true, // Roomに関連するCommentを取得
        host: {
          select: {
            user: {
              select: {
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    if (!room) {
      console.log('Room not found');
      return null;
    }

    const participantIdentity = room.participantId === userId ? 1 : 2;

    // 各Commentに対してユーザーのimageUrlを取得
    const commentsWithImages = await Promise.all(
      room.Comment.map(async (comment) => {
        const user = await prisma.user.findUnique({
          where: {
            userId: comment.userId,
          },
          select: {
            imageUrl: true,
          },
        });

        return {
          ...comment,
          userImageUrl: user?.imageUrl,
          userIdentity: comment.userId === userId ? 1 : 2, // userIdが一致する場合は1, そうでなければ2
        };
      })
    );

    console.log('roomRepository.ts: fetchRoom: room: ', commentsWithImages);

    if (!commentsWithImages) {
      // Roomが見つからない、またはParticipantが一致しない場合
      return [];
    }
    console.log(userId);

    return {
      commentsWithImages,
      participantIdentity,
    };
  },
  fetchRecruitDetail: async (Id: string) => {
    try {
      // ルームのIDに基づいてBosyuuListを検索
      const room = await prisma.room.findUnique({
        where: {
          id: Id,
        },
        include: {
          bosyuu: true, // 関連するBosyuuListを取得
        },
      });

      // BosyuuListが見つからない場合の処理
      if (!room || !room.bosyuu) {
        return null;
      }

      // BosyuuListのデータを返す
      return room.bosyuu;
    } catch (error) {
      // エラーハンドリング
      console.error('Error fetching recruitment details:', error);
      throw error;
    }
  },
};
