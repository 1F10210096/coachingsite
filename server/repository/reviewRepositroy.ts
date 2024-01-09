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
      name: review.student?.user?.name,
      imageUrl: review.student?.user?.imageUrl,
      rating: review.rating,
      review: review.review,
    }));
  },
  updateReview: async (
    selectedId: string,
    rating: string,
    review: string
  ): Promise<reviewModel[]> => {
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
