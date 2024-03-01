import { convertPngRepository } from '$/repository/convertPngRepository';
import { prismaClient } from '$/service/prismaClient';

export const updateUserUsecase = {
  fetchinfo: async (
    userId: string,
    like: string,
    newName: string,
    game: string,
    zisseki: string,
    selectedFile: string
  ) => {
    console.log('updateUserUsecase.fetchinfo');
    console.log(selectedFile, 'selectedFile');

    try {
      // 画像をアップロードし、S3からのレスポンスURLを取得
      const imageUrl = await convertPngRepository(selectedFile);

      // 更新するデータ内でレスポンスURLを正しく指定
      const updatedUser = await prismaClient.user.update({
        where: { userId },
        data: {
          name: newName, // 新しい名前を設定
          myProfile: zisseki, // 新しい実績情報を設定
          imageUrl, // アップロードした画像のURLを設定
        },
      });

      console.log('ユーザー情報を更新しました:', updatedUser);
    } catch (error) {
      console.error('Error uploading file or updating user:', error);
    }
  },
};
