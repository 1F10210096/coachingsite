export type UserSummaryModel = {
  name: string; // ユーザーの名前
  imageUrl: string; // ユーザーのイメージプロフィールのURL
  myProfile: string; // ユーザーのひと言コメント
  rating: number; // ユーザーの評価
};
export type Methods = {
  post: {
    resBody: UserSummaryModel[];
  };
};
