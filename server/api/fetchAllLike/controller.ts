import { userUsecase } from '$/usecase/userUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await userUsecase.fetchAllLike(body.Id),
  }),
}));
