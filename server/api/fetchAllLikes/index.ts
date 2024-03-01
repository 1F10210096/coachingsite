export type UserListItem = {
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
      Id: string;
    };
    resBody: UserListItem;
  };
};
