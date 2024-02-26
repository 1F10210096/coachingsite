import { userUsecase } from '$/usecase/userUsecase';
import { defineController } from './$relay';
export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await userUsecase.update(
      body.userId,
      body.name,
      body.myProfile,
      body.rating,
      body.imageUrl
    ),
  }),
}));
