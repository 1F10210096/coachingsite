import { popRecruitListUsecase } from '$/usecase/popRecruitListUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async () => ({
    status: 201,
    body: await popRecruitListUsecase.fetchAllinfo(),
  }),
}));
