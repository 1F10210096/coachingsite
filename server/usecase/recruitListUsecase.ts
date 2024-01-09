import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { recruitListRepository } from '$/repository/recruitListRepository';

import assert from 'assert';

export const recruitListUsecase = {
  fetchinfo: async (params: {
    Id: number;
    ranks?: number[];
    subjectRank?: number[];
    tags?: string[];
    lessonTypes?: string[];
  }): Promise<BosyuuListModel[]> => {
    const recuritList = await recruitListRepository.fetchinfo(params);
    assert(recuritList !== null, 'gameListはnullです');
    return recuritList;
  },
  fetchUserinfo: async (
    name: string,
    rating: string,
    profile: string,
): Promise<BosyuuListModel[]> => {
    console.log('recruitListUsecase.fetchUserinfo');
    console.log(name, 'wdsadw');
    console.log(rating, 'wdsadw');
    console.log(profile, 'wdsadw');
    const recuritList = await recruitListRepository.fetchUserinfo(name, rating, profile);
    assert(recuritList !== null, 'gameListはnullです');
    return recuritList;
  },
};
