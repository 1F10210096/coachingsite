import { recruitDetailUsecase } from '$/usecase/recruitDetailUsecase';
import { recruitListUsecase } from '$/usecase/recruitListUsecase';
import { userUsecase } from '$/usecase/userUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await userUsecase.fetchMyProfile(body.Id),
  }),
}));