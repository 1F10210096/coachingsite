import { gameListUsecase } from '$/usecase/gameUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await gameListUsecase.update(body.id, body.title, body.genre),
  }),
}));
