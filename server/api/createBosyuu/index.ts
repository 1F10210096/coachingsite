import type { BosyuuList } from '@prisma/client';
// Define the types for the methods of your API endpoint
export type Methods = {
  post: {
    reqBody: {
      user: string;
      title:string;
      selectedGame: string;
      selectedMyRanks: string;
      selectedRanks: string[]; // 配列としてランクを保持
      selecte
      coachContent: string;
      suchedule: string;
      OneWord: string;
    };
    resBody: BosyuuList;
  };
};
