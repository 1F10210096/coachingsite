import { userMyRepository } from '$/repository/userMyRepository';
import { userMyRoomRepository } from '$/repository/userMyRoomRepository';
import assert from 'assert';
export const recruitMyUsecase = {
  fetchinfo: async (userId: string) => {
    console.log('createU');
    console.log(userId);
    const user = await userMyRepository(userId);
    assert(user !== null, 'userはnullです');
    return user;
  },
  fetchRoomInfo: async (userId: string) => {
    console.log('createU');
    console.log(userId);
    const user = await userMyRoomRepository(userId);
    assert(user !== null, 'userはnullです');
    return user;
  },
};
