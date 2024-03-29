import { roomUsecase } from '$/usecase/roomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await roomUsecase.fetchinfo(body.Id, body.userId),
  }),
}));
