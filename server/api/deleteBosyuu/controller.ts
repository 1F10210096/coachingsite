import { recruitDetailUsecase } from '$/usecase/recruitDetailUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await recruitDetailUsecase.deleteInfo(body.Id),
  }),
}));
