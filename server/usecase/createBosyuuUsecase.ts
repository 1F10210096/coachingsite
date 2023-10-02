import { createBosyuuRepository } from '$/repository/createBosyuuRepository';
import assert from 'assert';
export const createBosyuuUsecase = {
  fetchinfo: async (
    user: string,
    title: string,
    selectedGameIndex: number,
    selectedMyRankIndex: number,
    selectedRanksIndex: number[],
    selectedTags: string[],
    achevement: string,
    description: string,
    notes: string,
    suchedule: string
  ) => {
    console.log('usecaseにきてるよ');
    console.log('useAAAAAAAAAr', achevement);
    const bosyuu = await createBosyuuRepository(
      user,
      title,
      selectedGameIndex,
      selectedMyRankIndex,
      selectedRanksIndex,
      selectedTags,
      achevement,
      description,
      suchedule,
      notes
    );
    assert(bosyuu !== null, 'bosyuuはnullです');
    return bosyuu;
  },
};
