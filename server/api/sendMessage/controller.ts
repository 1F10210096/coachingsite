import { commentUsecase } from '$/usecase/commentUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await commentUsecase.fetchinfo(body.Id, body.userId, body.message),
  }),
}));
