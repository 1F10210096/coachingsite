import type {
  BosyuuListFrontModel,
  UserSummaryDetailModel,
  reviewModel2,
} from '$/commonTypesWithClient/models';
import { recruitDetailRepository } from '$/repository/recruitDetailRepository';

import assert from 'assert';

export const recruitDetailUsecase = {
  fetchinfo: async (
    Id: string
  ): Promise<{
    bosyuuListFront: BosyuuListFrontModel;
    teacherProfile: UserSummaryDetailModel;
    reviewList: reviewModel2[];
  }> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const recuritDetail = await recruitDetailRepository.fetchinfo(Id);
    assert(recuritDetail !== null, 'recuritDetailはnullです');
    return recuritDetail;
  },
};
