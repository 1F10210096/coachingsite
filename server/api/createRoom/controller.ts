import { createRoomUsecase } from '$/usecase/createRoomUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await createRoomUsecase.fetchinfo(body.Id, body.myId),
  }),
}));
