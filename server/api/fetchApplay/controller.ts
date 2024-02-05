import { recruitApproveUsecase } from '$/usecase/recruitApproveUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await recruitApproveUsecase.approveInfo(body.id),
  }),
}));
