import { createUserRepository } from '$/repository/createUserRepository';
import assert from 'assert';
export const createUserUsecase = {
  fetchinfo: async (userId: string, userName: string) => {
    console.log('createU');
    const user = await createUserRepository(userId, userName);
    assert(user !== null, 'userはnullです');
    return user;
  },
};
