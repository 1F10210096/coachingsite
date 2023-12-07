import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { recruitDetailRepository } from '$/repository/recruitDetailRepository';

import assert from 'assert';

export const recruitDetailUsecase = {
  fetchinfo: async (Id: string): Promise<BosyuuListModel> => {
    console.log('recruitDetailUsecase.fetchinfo');
    const recuritDetail = await recruitDetailRepository.fetchinfo(Id);
    assert(recuritDetail !== null, 'recuritDetailはnullです');
    return recuritDetail;
  },
};
