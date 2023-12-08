import { reviewUsecase } from '$/usecase/reviewUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await reviewUsecase.fetchinfo(body.Id),
  }),
}));
