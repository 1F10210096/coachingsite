import type { BosyuuList, Student } from '@prisma/client';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: { user: UserListItem[]; user2: NewApplyData[] };
  };
};
export type NewApplyData = {
  id: string;
  roomId: string;
  bosyuuId: string;
  studentId: string;
  status: string;
  date: string; // データ型がstringのため、Date型への変換が必要かどうかはデータの使い方によります
  time: string;
  rating: number | null; // Float?はnumber型に対応し、nullが許容されます
  review: string | null; // String?はstring型に対応し、nullが許容されます
  bosyuu: BosyuuList; // この型は別途定義する必要があります
  student: Student; // この型は別途定義する必要があります
};

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
