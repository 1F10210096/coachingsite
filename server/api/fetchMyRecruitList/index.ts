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
export type NewApp = {
  id: string;
  bosyuuId: string;
  studentId: string;
  status: string;
  date: Date;
  time: string;
  rating: number | null;
  review: string | null;
};
export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: { user: UserListItem[]; user2: NewApp[] };
  };
};
