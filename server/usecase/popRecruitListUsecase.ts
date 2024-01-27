import type { newBosyuu } from '$/commonTypesWithClient/models';
import { popRecruitListRepository } from '$/repository/popRecruitListRepository';

import assert from 'assert';
export const popRecruitListUsecase = {
  fetchinfo: async (): Promise<newBosyuu[]> => {
    console.log('gameListUsecase.fetchinfo');
    const popRecruitList = await popRecruitListRepository.fetchinfo();
    assert(popRecruitList !== null, 'popRecruitListはnullです');
    return popRecruitList;
  },
};
