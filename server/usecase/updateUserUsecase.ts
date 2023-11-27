import { updateUserRepository } from '$/repository/updateUserRepository'; // 仮定のインポート
import assert from 'assert';

export const updateUserUsecase = {
  fetchinfo: async (
    userId: string,
    newName: string,
    newProfile: string | undefined,
    imageUrl: string | undefined
  ) => {
    // 仮定: updateUserRepository は更新されたユーザーを返す
    const updatedUser = await updateUserRepository(userId, newName, newProfile, imageUrl);
    assert(updatedUser !== null, '更新後のユーザーはnullではありません');
    return updatedUser;
  },
};
