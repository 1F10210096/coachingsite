export type UserModel = {
  userId: string;
  name: string;
  myProfile: string | null;
  rating?: number | null;
  imageUrl: string | null;
  created: Date;
  game?: string;
  studentId?: string;
  teacherId?: string;
};
export type Methods = {
  post: {
    reqBody: {
      userId: string;
      userName: string;
    };
    resBody: UserModel;
  };
};
