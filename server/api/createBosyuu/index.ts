import type { BosyuuList } from '@prisma/client';
// Define the types for the methods of your API endpoint
export type Methods = {
  post: {
    reqBody: {
      userId: string;
      selectedGame: string;
      selectedRanks: string[]; // 配列としてランクを保持
      coachContent: string;
      suchedule: string;
      OneWord: string;
    };
    resBody: BosyuuList;
  };
};
