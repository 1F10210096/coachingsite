import assert from 'assert';
import { createRoomRepository } from '../repository/createRoomRepository';
export const createRoomUsecase = {
  fetchinfo: async (Id: string, muId: string) => {
    console.log('createU');
    const user = await createRoomRepository.fetchOrCreateRoom(Id, muId);
    assert(user !== null, 'userはnullです');
    return user;
  },
};
