import { updateUserUsecase } from '$/usecase/updateUserUsecase';
import { defineController } from './$relay';
export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await updateUserUsecase.fetchinfo(body.selectedFile),
  }),
}));
