import type { BosyuuListModel3, User3 } from '$/commonTypesWithClient/models';
import { recruitListRepository } from '$/repository/recruitListRepository';

import assert from 'assert';

export const recruitListUsecase = {
  fetchinfo: async (params: {
    Id: number;
    ranks?: number[];
    subjectRank?: number[];
    tags?: string[];
    lessonWard?: string;
    ward?: string;
  }): Promise<BosyuuListModel3[]> => {
    const recuritList = await recruitListRepository.fetchinfo(params);
    assert(recuritList !== null, 'gameListはnullです');
    return recuritList;
  },
  fetchUserinfo: async (
    name: string,
    rating: string,
    profile: string
  ): Promise<{ models: BosyuuListModel3[]; user: User3 }> => {
    console.log('recruitListUsecase.fetchUserinfo');
    const recuritList = await recruitListRepository.fetchUserinfo(name, rating, profile);
    assert(recuritList !== null, 'gameListはnullです');
    return recuritList;
  },
  fetchAllInfo: async (): Promise<BosyuuListModel3[]> => {
    console.log('recruitListUsecase.fetchAllInfo');
    const recuritList = await recruitListRepository.fetchAllInfo();
    assert(recuritList !== null, 'gameListはnullです');
    return recuritList;
  },
  fetchCategoriesRecruit: async (Id: string): Promise<BosyuuListModel3[]> => {
    console.log('recruitListUsecase.fetchCategoriesRecruit');
    console.log(Id, 'wdsadw');
    const recuritList = await recruitListRepository.fetchCategoriesRecruit(Id);
    assert(recuritList !== null, 'gameListはnullです');
    return recuritList;
  },
};
