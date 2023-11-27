import { gameListUsecase } from '$/usecase/gameUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async () => ({
    status: 201,
    body: await gameListUsecase.fetchinfo(),
  }),
}));
