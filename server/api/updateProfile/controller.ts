import { updateUserUsecase } from '$/usecase/updateUserUsecase';
import { defineController } from './$relay';
export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await updateUserUsecase.fetchinfo(
      body.userId,
      body.newName,
      body.game,
      body.zisseki,
      body.selectedFile
    ),
  }),
}));
