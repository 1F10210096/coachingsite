import { createUserRepository } from '$/repository/createUserRepository';
import { userRepository } from '$/repository/userRepository';
import assert from 'assert';

export const createUserUsecase = {
  fetchinfo: async (userId: string, userName: string) => {
    console.log('createU');

    // ユーザーが既に存在するか確認
    const existingUser = await userRepository.fetchMyProfile(userId);
    if (existingUser) {
      console.log('ユーザーは既に存在します。');
      return existingUser; // 既存のユーザーを返す
    }

    // 既存のユーザーがいない場合、新しいユーザーを作成
    const newUser = await createUserRepository(userId, userName);
    assert(newUser !== null, 'userはnullです');
    return newUser; // 新しく作成されたユーザーを返す
  },
};
