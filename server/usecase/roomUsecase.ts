import type {
  CommentsWithImages,
  RoomWithLatestComment,
  UserListItem,
} from '$/commonTypesWithClient/models';
import { roomRepository } from '$/repository/roomRepository';
import assert from 'assert';

export const roomUsecase = {
  fetchinfo: async (Id: string, userId: string): Promise<CommentsWithImages[]> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const room = await roomRepository.fetchRoom(Id, userId);
    assert(room !== null, 'roomはnullです');
    return room;
  },
  fetchRecruitDetail: async (Id: string): Promise<UserListItem> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const room = await roomRepository.fetchRecruitDetail(Id);
    assert(room !== null, 'roomはnullです');
    return room;
  },
  fetchUser: async (Id: string, userId: string): Promise<number | null> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const room = await roomRepository.fetchUser(Id, userId);
    assert(room !== null, 'roomはnullです');
    return room;
  },
  fetchRooms: async (userId: string): Promise<RoomWithLatestComment[]> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const room = await roomRepository.fetchRooms(userId);
    assert(room !== null, 'roomはnullです');
    return room;
  },
};
