import type { CommentsWithImages, UserListItem } from '$/commonTypesWithClient/models';
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
};
