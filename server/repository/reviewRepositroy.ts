/* eslint-disable max-depth */
/* eslint-disable complexity */
import type { reviewModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';

export const reviewRepository = {
  fetchSortedReviews: async (Id: string): Promise<reviewModel[]> => {
    const sortedReviews = await prismaClient.apply.findMany({
      where: {
        bosyuuId: Id,
      },
      orderBy: {
        rating: 'desc',
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                imageUrl: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return sortedReviews.map((review) => ({
      name: review.student?.user?.name || '', // name プロパティが null の場合は空の文字列に変換
      imageUrl: (review.student?.user?.imageUrl ?? '') || '', // imageUrl プロパティが null の場合は空の文字列に変換
      rating: (review.rating ?? 0) || 0, // rating プロパティが null の場合は数値の 0 に変換
      review: (review.review ?? '') || '', // review プロパティが null の場合は空の文字列に変換
    }));
  },
  updateReview: async (selectedId: string, rating: string, review: string) => {
    try {
      // parseFloat を使って rating を数値に変換
      const numericRating = parseFloat(rating);

      // 指定されたIDで apply レコードを更新
      const updatedApplication = await prismaClient.apply.updateMany({
        where: {
          id: selectedId,
        },
        data: {
          rating: numericRating,
          review,
        },
      });
      console.log(updatedApplication,'dsgrgrgfgdgrgd');
      const updatedApplication2 = await prismaClient.apply.findFirst({
        where: {
          id: selectedId,
        },
      });
      console.log(updatedApplication2, 'awdsdadffffffffff');
      if (updatedApplication2) {
        // bosyuuId から bosyuu レコードを取得し、関連する teacherId を見つける
        const bosyuuRecord = await prismaClient.bosyuuList.findUnique({
          where: { id: updatedApplication2.bosyuuId },
        });

        console.log(bosyuuRecord, 'wiwiwiw');
        if (bosyuuRecord) {
          // teacherId でユーザー（教師）を検索
          const teacher = await prismaClient.user.findUnique({
            where: { userId: bosyuuRecord.teacherId },
          });
          console.log(teacher, 'qoqoq');

          // eslint-disable-next-line max-depth
          if (teacher && teacher.rating !== undefined) {
            // 新しいレーティングを計算（現在のレーティングと新しいレーティングの平均）
            // 新しいレーティングを計算（現在のレーティングと新しいレーティングの平均）
            const newRating = Math.floor((((teacher?.rating ?? 0) + numericRating) / 2) * 10) / 10;

            console.log(newRating, 'wqqqqqqqqqq');

            // ユーザー（教師）のレーティングを更新
            await prismaClient.user.update({
              where: { userId: bosyuuRecord.teacherId },
              data: { rating: newRating },
            });
          }
        }
      }
    } catch (error) {
      console.error('Error updating review:', error);
      // エラー時は適切に処理（例：nullを返す、エラーを再スローするなど）
      throw error;
    }
  },
};
