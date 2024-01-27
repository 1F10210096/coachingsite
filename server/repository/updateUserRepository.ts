import type { UserModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { User } from '@prisma/client';

const toUserModel = (prismaUser: User): UserModel => ({
  userId: prismaUser.userId,
  name: prismaUser.name,
  myProfile: prismaUser.myProfile,
  imageUrl: prismaUser.imageUrl ?? null, // nullの場合にundefinedを使用
  created: prismaUser.createdAt,
});

export const updateUserRepository = async (
  userId: string,
  newName: string,
  newProfile: string | undefined,
  imageUrl: string | undefined
) => {
  // ユーザー情報を更新
  console.log('updateUserRepository');
  console.log('userId', userId);
  console.log('newName', newName);
  console.log('newProfile', newProfile);
  console.log('imageUrl', imageUrl);
  const updatedUser = await prismaClient.user.update({
    where: { userId },
    data: {
      name: newName, // 'userName' を正しいプロパティ名に変更
      myProfile: newProfile ?? null,
      imageUrl: imageUrl ?? null,
    },
  });

  toUserModel(updatedUser);
  console.log('updatedUser', updatedUser);
  return updatedUser;
};

// GameListモデルを保存または更新するメソッド
export const saveGameList = async (user: UserModel) => {
  await prismaClient.user.upsert({
    where: { userId: user.userId },
    update: {
      name: user.name,
      myProfile: user.myProfile,
      imageUrl: user.imageUrl,
    },
    create: {
      userId: user.userId,
      name: user.name,
      myProfile: user.myProfile,
      imageUrl: user.imageUrl,
    },
  });
};
