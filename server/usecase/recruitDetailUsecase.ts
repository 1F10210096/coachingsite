import type {
  BosyuuListFrontModel,
  UserSummaryDetailModel,
  reviewModel2,
} from '$/commonTypesWithClient/models';
import { recruitDetailRepository } from '$/repository/recruitDetailRepository';
import { prismaClient } from '$/service/prismaClient';

import assert from 'assert';

export const recruitDetailUsecase = {
  fetchinfo: async (
    Id: string
  ): Promise<{
    bosyuuListFront: BosyuuListFrontModel;
    teacherProfile: UserSummaryDetailModel;
    reviewList: reviewModel2[];
  }> => {
    const recuritDetail = await recruitDetailRepository.fetchinfo(Id);
    assert(recuritDetail !== null, 'recuritDetailはnullです');
    return recuritDetail;
  },
  deleteInfo: async (id: string) => {
    try {

      const rooms = await prismaClient.room.findMany({
        where: { bosyuuId: id },
      });
  
      // 各`Room`に紐付いた`Comment`を削除
      for (const room of rooms) {
        await prismaClient.comment.deleteMany({
          where: { roomId: room.id },
        });
      }

      // 関連する`apply`レコードを削除
      await prismaClient.apply.deleteMany({
        where: { bosyuuId: id },
      });
      await prismaClient.comment.deleteMany({
        where:{}
      })

      // 関連する`rooms`レコードを削除
      await prismaClient.room.deleteMany({
        where: { bosyuuId: id },
      });

      // 関連する`Favorite`レコードを削除
      await prismaClient.favorite.deleteMany({
        where: { bosyuuListId: id },
      });

      console.log(id)
      // 最後に`BosyuuList`のレコードを削除
      const deleteResult = await prismaClient.bosyuuList.delete({
        where: { id },
      });

      console.log('削除成功:', deleteResult);
      return deleteResult; // 成功した削除結果を返す
    } catch (error) {
      console.error('削除中にエラーが発生しました:', error);
      throw error; // エラーを再度投げることで、この関数を呼び出した側でもエラーハンドリングができるようにする
    }
  },
};
