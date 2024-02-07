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
      selectedId: string;
      rating: string;
      review: string;
    };
  };
};
