import { createBosyuuRepository } from '$/repository/createBosyuuRepository';
import assert from 'assert';
export const createBosyuuUsecase = {
  fetchinfo: async (
    userId: string,
    selectedGame: string,
    selectedRanks: string[],
    coachContent: string,
    suchedule: string,
    OneWord: string
  ) => {
    console.log('usecaseにきてるよ');
    const bosyuu = await createBosyuuRepository(userId,selectedGame, selectedRanks,coachContent,suchedule,OneWord);
    assert(bosyuu !== null, 'bosyuuはnullです');
    return bosyuu;
  },
};
