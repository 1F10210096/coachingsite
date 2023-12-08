import type { BosyuuListModel } from '$/commonTypesWithClient/models';

import assert from 'assert';

export const reviewUsecase = {
  fetchinfo: async (Id: string): Promise<BosyuuListModel> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const review = await reviewRepository.fetchinfo(Id);
    assert(review !== null, 'reviewはnullです');
    return review;
  },
};
