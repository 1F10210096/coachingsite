import { createBosyuuUsecase } from '$/usecase/createBosyuuUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({body}) => ({
    status: 201,
    body: await createBosyuuUsecase.fetchinfo(body.user, body.title, body.selectedGame,body.selectedMyRanks,body.selectedRanks,body.selectedTags,body.achevement,body.description,body.suchedule,body.notes),
  }),
}));
