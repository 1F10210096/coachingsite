import { createBosyuuUsecase } from '$/usecase/createBosyuuUsecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => ({
    status: 201,
    body: await createBosyuuUsecase.fetchinfo(
      body.user,
      body.title,
      body. selectedGameIndex,
      body.selectedMyRankIndex,
      body.selectedRanksIndex,
      body.lessonType,
      body.selectedTags,
      body.acheavement,
      body.description,
      body.suchedule,
      body.notes
    ),
  }),
}));
