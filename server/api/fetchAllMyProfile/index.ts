export type User3 = {
  userId: string;
  name: string;
  myProfile: string | null;
  rating: number | null;
  imageUrl: string | null;
  createdAt: Date;
};
export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: User3;
  };
};
