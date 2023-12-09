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
};
