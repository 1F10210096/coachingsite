/* eslint-disable complexity */
import type { NewApp, reviewModel } from '$/commonTypesWithClient/models';
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
  updateReview: async (selectedId: string, rating: string, review: string): Promise<NewApp> => {
    try {
      // parseFloat を使って rating を数値に変換
      const numericRating = parseFloat(rating);

      // 指定されたIDで apply レコードを更新
      const updatedApplication = await prismaClient.apply.update({
        where: {
          id: selectedId,
        },
        data: {
          rating: numericRating,
          review,
        },
      });

      // 更新されたレコードを返す
      return updatedApplication;
    } catch (error) {
      console.error('Error updating review:', error);
      // エラー時は適切に処理（例：nullを返す、エラーを再スローするなど）
      throw error;
    }
  },
};
