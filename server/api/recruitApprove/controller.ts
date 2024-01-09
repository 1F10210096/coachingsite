import { recruitApproveUsecase } from '$/usecase/recruitApproveUsecase';
import { recruitMyUsecase } from '$/usecase/recruitMyUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await recruitApproveUsecase.fetchinfo(body.Id,body.bosyuuId,body.roomId,body.userId),
  }),
}));
