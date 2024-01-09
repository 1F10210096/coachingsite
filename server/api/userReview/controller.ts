import { defineController } from './$relay';
import { userUsecase } from '$/usecase/userUsecase';
export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await userUsecase.fetchReview(body.Id),
  }),
}));
