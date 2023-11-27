import { createUserUsecase } from '$/usecase/createUserUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({body}) => ({
    status: 201,
    body: await createUserUsecase.fetchinfo(body.userId,body.userName),
  }),
}));
