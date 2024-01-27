import type { NewApp, reviewModel } from '$/commonTypesWithClient/models';
import { reviewRepository } from '$/repository/reviewRepositroy';

import assert from 'assert';

export const reviewUsecase = {
  fetchinfo: async (Id: string): Promise<reviewModel[]> => {
    console.log('reviewUsecase.fetchinfo');
    const review = await reviewRepository.fetchSortedReviews(Id);
    assert(review !== null, 'reviewはnullです');
    return review;
  },
  createinfo: async (selectedId: string, rating: string, review: string): Promise<NewApp> => {
    console.log('reviewUsecase.fetchinfo');
    const review1 = await reviewRepository.updateReview(selectedId, rating, review);
    assert(review1 !== null, 'reviewはnullです');
    return review1;
  },
};
