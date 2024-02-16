/* eslint-disable max-lines */
import type {
  CommentsWithImages,
  RoomWithLatestComment,
  UserListItem,
} from '$/commonTypesWithClient/models';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const roomRepository = {
  fetchRoom: async (roomId: string, userId: string): Promise<CommentsWithImages[] | null> => {
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

    console.log(userId);

    return commentsWithImages;
  },
  fetchRecruitDetail: async (Id: string): Promise<UserListItem | null> => {
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
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
  fetchUser: async (roomId: string, userId: string): Promise<number | null> => {
    try {
      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!room) {
        console.log('Room not found');
        return null; // 部屋が見つからない場合はnullを返す
      }

      console.log(userId);
      console.log(room);

      // userIdがparticipantIdと一致する場合は1を返す
      if (userId === room.participantId) {
        return 1;
      }

      // userIdがhostIdと一致する場合は2を返す
      if (userId === room.hostId) {
        return 2;
      }

      // userIdがparticipantIdやhostIdと一致しない場合
      return null;
    } catch (error) {
      // エラーハンドリング
      console.error('Error fetching recruitment details:', error);
      throw error;
    }
  },
  fetchRooms: async (userId: string): Promise<RoomWithLatestComment[]> => {
    try {
      const roomsWithLatestComment = await prisma.room.findMany({
        where: {
          hostId: userId,
        },
        include: {
          Comment: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: {
                select: {
                  name: true,
                  imageUrl: true, // ユーザーの写真（imageUrl）のみを取得
                  // 他に必要なフィールドがあれば、ここに追加
                },
              },
            },
          },
          // 他に必要なフィールドがあれば、ここに追加
        },
      });

      const roomsWithMappedComments = roomsWithLatestComment.map((room) => ({
        ...room,
        latestComment: room.Comment.length > 0 ? room.Comment[0] : null,
        commentUser: room.Comment.length > 0 ? room.Comment[0].user : null, // コメント投稿者の情報
      }));

      if (roomsWithMappedComments.length === 0) {
        return [];
      }

      return roomsWithMappedComments;
    } catch (error) {
      console.error('Error fetching rooms with latest comment and user:', error);
      throw error;
    }
  },
  fetchDm: async (userId: string): Promise<RoomWithLatestComment[]> => {
    try {
      console.log('dddddddddddddddddddddddddddddddddddddddd');
      const roomsWithLatestComment = await prisma.room.findMany({
        where: {
          participantId: userId,
        },
        include: {
          Comment: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
          apply: true,
          // 他に必要なフィールドがあれば、ここに追加
        },
      });
      console.log(roomsWithLatestComment, 'dadwa');
      const roomsWithMappedComments = roomsWithLatestComment.map((room) => ({
        ...room,
        latestComment: room.Comment.length > 0 ? room.Comment[0] : null,
        commentUser: room.Comment.length > 0 ? room.Comment[0].user : null, // コメント投稿者の情報
      }));

      if (roomsWithMappedComments.length === 0) {
        return [];
      }

      return roomsWithMappedComments;
    } catch (error) {
      console.error('Error fetching rooms with latest comment and user:', error);
      throw error;
    }
  },
  fetchDm2: async (userId: string): Promise<RoomWithLatestComment[]> => {
    try {
      console.log('dddddddddddddddddddddddddddddddddddddddd');
      const roomsWithLatestComment = await prisma.room.findMany({
        where: {
          participantId: userId,
        },
        include: {
          Comment: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
          apply: true,
          // 他に必要なフィールドがあれば、ここに追加
        },
      });
      console.log(roomsWithLatestComment, 'dadwa');
      const roomsWithNonEmptyApplies = roomsWithLatestComment.filter(
        (room) => room.apply.length > 0
      );
      const roomsWithMappedComments = roomsWithNonEmptyApplies.map((room) => ({
        ...room,
        latestComment: room.Comment.length > 0 ? room.Comment[0] : null,
        commentUser: room.Comment.length > 0 ? room.Comment[0].user : null, // コメント投稿者の情報
      }));

      if (roomsWithMappedComments.length === 0) {
        return [];
      }

      return roomsWithMappedComments;
    } catch (error) {
      console.error('Error fetching rooms with latest comment and user:', error);
      throw error;
    }
  },
  fetchDmCoach: async (userId: string): Promise<RoomWithLatestComment[]> => {
    try {
      console.log('dddddddddddddddddddddddddddddddddddddddd');
      const roomsWithLatestComment = await prisma.room.findMany({
        where: {
          hostId: userId,
        },
        include: {
          Comment: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
          apply: true,
          // 他に必要なフィールドがあれば、ここに追加
        },
      });
      console.log(roomsWithLatestComment, 'dadwa');
      const roomsWithMappedComments = roomsWithLatestComment.map((room) => ({
        ...room,
        latestComment: room.Comment.length > 0 ? room.Comment[0] : null,
        commentUser: room.Comment.length > 0 ? room.Comment[0].user : null, // コメント投稿者の情報
      }));

      if (roomsWithMappedComments.length === 0) {
        return [];
      }

      return roomsWithMappedComments;
    } catch (error) {
      console.error('Error fetching rooms with latest comment and user:', error);
      throw error;
    }
  },
  fetchDm2Coach: async (userId: string): Promise<RoomWithLatestComment[]> => {
    try {
      console.log('dddddddddddddddddddddddddddddddddddddddd');
      const roomsWithLatestComment = await prisma.room.findMany({
        where: {
          hostId: userId,
        },
        include: {
          Comment: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              user: {
                select: {
                  name: true,
                  imageUrl: true,
                },
              },
            },
          },
          apply: true,
          // 他に必要なフィールドがあれば、ここに追加
        },
      });
      console.log(roomsWithLatestComment, 'dadwa');
      const roomsWithNonEmptyApplies = roomsWithLatestComment.filter(
        (room) => room.apply.length > 0
      );
      const roomsWithMappedComments = roomsWithNonEmptyApplies.map((room) => ({
        ...room,
        latestComment: room.Comment.length > 0 ? room.Comment[0] : null,
        commentUser: room.Comment.length > 0 ? room.Comment[0].user : null, // コメント投稿者の情報
      }));

      if (roomsWithMappedComments.length === 0) {
        return [];
      }

      return roomsWithMappedComments;
    } catch (error) {
      console.error('Error fetching rooms with latest comment and user:', error);
      throw error;
    }
  },
};
