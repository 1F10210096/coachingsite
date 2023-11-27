import type { UserModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
import type { User } from '@prisma/client';

const toUserModel = (prismaUser: User): UserModel => ({
  userId: prismaUser.userId,
  name: prismaUser.name,
  imageUrl: prismaUser.imageUrl ?? null, // nullの場合にundefinedを使用
  created: prismaUser.createdAt.getTime(),
});
export const createUserRepository = async (
  userId: string,
  userName: string
): Promise<UserModel> => {
  const newUser = await prismaClient.user.create({
    data: {
      userId, // Assuming 'userId' is a unique identifier for the User
      name: userName, // Set the 'name' field to the provided userName
      // Include other necessary fields as per your User model in Prisma
    },
  });
  console.log("dawd");

  return toUserModel(newUser);
};
