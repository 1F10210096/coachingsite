import { defineController } from './$relay';
import { updateUserUsecase } from '$/usecase/updateUserUsecase';
export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await updateUserUsecase.fetchinfo(body.selectedFile),
  }),
}));
