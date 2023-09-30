import { createBosyuuRepository } from '$/repository/createBosyuuRepository';
import assert from 'assert';
export const createBosyuuUsecase = {
  fetchinfo: async (
    user: string,
    title:string,
    selectedGame: string,
    selectedMyRanks: string,
    selectedRanks: string[],
    selectedTags:string[],
    achevement: string,
    description: string,
    notes: string,
    suchedule: string,
  ) => {
    console.log('usecaseにきてるよ');
    const bosyuu = await createBosyuuRepository(user,title, selectedRanks,selectedGame,selectedMyRanks,selectedTags,achevement,description,suchedule,notes)
    assert(bosyuu !== null, 'bosyuuはnullです');
    return bosyuu;
  },
};
