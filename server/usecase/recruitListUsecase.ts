import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { recruitListRepository } from '$/repository/recruitListRepository';

import assert from 'assert';

export const recruitListUsecase = {
  fetchinfo: async (params: {
    Id: string;
    ranks?: string[];
    subjectRank?: string[];
    tags?: string[];
    roles?: string[];
  }): Promise<BosyuuListModel[]> => {
    console.log('recruitListUsecase.fetchinfo');  
    console.log(params)
    const recuritList = await recruitListRepository.fetchinfo(params);
    assert(recuritList !== null, 'gameListはnullです');
    return recuritList;
  },
};
