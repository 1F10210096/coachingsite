import { recruitMyUsecase } from '$/usecase/recruitMyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await recruitMyUsecase.fetchRoomInfo(body.roomId),
  }),
}));
