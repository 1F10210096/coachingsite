import { recruitDetailUsecase } from '$/usecase/recruitDetailUsecase';
import { recruitListUsecase } from '$/usecase/recruitListUsecase';
import { userUsecase } from '$/usecase/userListUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await userUsecase.fetchDetailinfo(body.teacherId),
  }),
}));