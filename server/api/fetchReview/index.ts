export type reviewModel = {
  name: string; // ユーザーの名前
  imageUrl: string; // ユーザーのイメージプロフィールのURL
  rating: number; // ユーザーの評価
  review: string; // ユーザーの一言
};

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: reviewModel[];
  };
};
