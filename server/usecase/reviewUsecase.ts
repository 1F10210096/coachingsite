import type { BosyuuListModel, reviewModel } from '$/commonTypesWithClient/models';
import { reviewRepository } from '$/repository/reviewRepositroy';

import assert from 'assert';

export const reviewUsecase = {
  fetchinfo: async (Id: string): Promise<reviewModel[]> => {
    console.log('reviewUsecase.fetchinfo');
    const review = await reviewRepository.fetchSortedReviews(Id);
    assert(review !== null, 'reviewはnullです');
    return review;
  },
};
