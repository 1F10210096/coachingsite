export type newBosyuu = {
  id: string;
  gameId: number;
  title: string;
  rank: number;
  subjectRank: number[];
  tag: string[];
  lessonType: string;
  description: string;
  notes: string;
  myProfile: string;
  descriptionDetail: string;
  suchedule: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Methods = {
  post: {
    reqBody: {
      user: string;
      title: string;
      selectedGameIndex: number;
      selectedMyRankIndex: number;
      selectedRanksIndex: number[]; // 配列としてランクを保持
      lessonType: string;
      selectedTags: string[]; // 配列としてタグを保持
      acheavement: string;
      description: string;
      notes: string;
      suchedule: string;
    };
    resBody: newBosyuu;
  };
};
