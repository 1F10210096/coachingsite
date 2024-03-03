import { convertPngRepository } from '$/repository/convertPngRepository';
import { prismaClient } from '$/service/prismaClient';

export const updateUserUsecase = {
  fetchinfo: async (userId: string, newName: string, myProfile: string, selectedFile: string) => {
    console.log('updateUserUsecase.fetchinfo');
    console.log(selectedFile, 'selectedFile');

    try {
      // まず現在のユーザー情報を取得
      const currentUser = await prismaClient.user.findUnique({
        where: { userId },
      });

      let imageUrl;
      // 提供された画像URLが現在の画像URLと異なるかチェック
      if (!currentUser || currentUser.imageUrl !== selectedFile) {
        // 画像をアップロードし、S3からのレスポンスURLを取得
        imageUrl = await convertPngRepository(selectedFile);
      } else {
        // 既存の画像URLを使用
        imageUrl = currentUser.imageUrl;
      }

      // 更新するデータ内でレスポンスURLを正しく指定
      const updatedUser = await prismaClient.user.update({
        where: { userId },
        data: {
          name: newName, // 新しい名前を設定
          myProfile, // 新しい実績情報を設定
          imageUrl, // アップロードした画像のURL or 既存のURLを設定
        },
      });

      console.log('ユーザー情報を更新しました:', updatedUser);
    } catch (error) {
      console.error('Error uploading file or updating user:', error);
    }
  },
};
