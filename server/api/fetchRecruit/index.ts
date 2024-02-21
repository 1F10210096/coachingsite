import type { BosyuuList } from '@prisma/client';

export type BosyuuListModel3 = {
  id: string; // またはstring
  gameId: number; // またはstring
  title: string;
  rank: number; // またはstring
  subjectRank: number[]; // またはstring[]
  tag: string[];
  description: string;
  suchedule: string; // 注意: タイポかもしれません（schedule?）
  myProfile: string;
  notes: string;
  lessonType: string;
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    hitokoto: string;
    user: {
      imageUrl: string;
    };
    userId: string;
    bosyuuLists: BosyuuList[]; // この部分はBosyuuListの配列を想定
  };
  // 他の必要なBosyuuListのフィールドがあればここに追加
};
export type Methods = {
  post: {
    reqBody: {
      Id: number;
      ranks: number[];
      subjectRank: number[];
      tag: string[];
      lessonWard: string;
      ward: string;
    };
    resBody: BosyuuListModel3[];
  };
};
