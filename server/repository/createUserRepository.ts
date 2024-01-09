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
      myProfile: '皆さんよろしくお願いします!', // Set the 'myProfile' field to null
      rating: 3.0, // Set the 'rating' field to 0
      imageUrl:
        'https://coach-user-profile.s3.ap-northeast-1.amazonaws.com/profile-images/kkrn_icon_user_1.png', // Set the 'imageUrl' field to null
      // Include other necessary fields as per your User model in Prisma
    },
  });
  console.log('dawd');

  const newStudent = await prismaClient.student.create({
    data: {
      userId, // Assuming 'userId' is a unique identifier for the User
    },
  });
  const newTeacher = await prismaClient.teacher.create({
    data: {
      userId, // Assuming 'userId' is a unique identifier for the User
      hitokoto: '一緒に頑張りましょう！',
      Achievements: '特になし',
    },
  });

  console.log('dawd');

  return toUserModel(newUser);
};
