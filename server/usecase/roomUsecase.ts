import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { roomRepository } from '$/repository/roomRepository';
import assert from 'assert';

export const roomUsecase = {
  fetchinfo: async (Id: string, userId: string): Promise<BosyuuListModel> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const room = await roomRepository.fetchRoom(Id, userId);
    assert(room !== null, 'roomはnullです');
    return room;
  },
};
