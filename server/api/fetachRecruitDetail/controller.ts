import { recruitDetailUsecase } from '$/usecase/recruitDetailUsecase';
import { recruitListUsecase } from '$/usecase/recruitListUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await recruitDetailUsecase.fetchinfo(body.Id),
  }),
}));