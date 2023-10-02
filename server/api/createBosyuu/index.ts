import type { BosyuuList } from '@prisma/client';
// Define the types for the methods of your API endpoint
export type Methods = {
  post: {
    reqBody: {
      user: string;
      title: string;
      selectedGameIndex: number;
      selectedMyRankIndex: number;
      selectedRanksIndex: number[]; // 配列としてランクを保持
      selectedTags: string[]; // 配列としてタグを保持
      acheavement: string;
      description: string;
      notes: string;
      suchedule: string;
    };
    resBody: BosyuuList;
  };
};
