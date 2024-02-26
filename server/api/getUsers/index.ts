export type UserModel2 = {
  userId: string;
  name: string;
  myProfile: string | null;
  rating: number | null;
  imageUrl: string | null;
  createdAt: Date;
};
export type Methods = {
  post: {
    resBody: UserModel2[];
  };
};
