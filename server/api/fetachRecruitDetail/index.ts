export type BosyuuListFrontModel = {
  id: string;
  gameId: number;
  title: string;
  rank: number;
  subjectRank: number[];
  tag: string[];
  description: string;
  notes: string;
  myProfile: string;
  descriptionDetail: string;
  suchedule: string;
  lessonType: string;
  createdAt: Date;
  updatedAt: Date;
};
export type UserSummaryDetailModel = {
  name: string; // ユーザーの名前
  imageUrl: string; // ユーザーのイメージプロフィールのURL
  myProfile: string; // ユーザーのひと言コメント
  rating: number; // ユーザーの評価
  Achievements: string; // ユーザーの実績
  hitokoto: string; // ユーザーの一言
};
export type reviewModel2 = {
  name: string;
  imageUrl: string | null; // imageUrl を string | null に変更
  rating: number;
  review: string | null; // review も string | null に変更
};

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: {
      bosyuuListFront: BosyuuListFrontModel;
      teacherProfile: UserSummaryDetailModel;
      reviewList: reviewModel2[];
    };
  };
};
