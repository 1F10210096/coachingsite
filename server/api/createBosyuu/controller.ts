import { createBosyuuUsecase } from '$/usecase/createBosyuuUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({body}) => ({
    status: 201,
    body: await createBosyuuUsecase.fetchinfo(body.userId, body.selectedGame, body.selectedRanks,body.coachContent,body.suchedule,body.OneWord  ),
  }),
}));
