import { userListUsecase } from '$/usecase/userListUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async () => ({
    status: 201,
    body: await userListUsecase.fetchinfo(),
  }),
}));
