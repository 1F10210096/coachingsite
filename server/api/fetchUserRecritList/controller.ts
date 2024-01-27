import { recruitListUsecase } from '$/usecase/recruitListUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await recruitListUsecase.fetchUserinfo(body.name, body.rating, body.profile),
  }),
}));
