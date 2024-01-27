import { popRecruitListUsecase } from '$/usecase/popRecruitListUsecase';
import { recruitListUsecase } from '$/usecase/recruitListUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async () => ({
    status: 201,
    body: await recruitListUsecase.fetchAllInfo(),
  }),
}));
