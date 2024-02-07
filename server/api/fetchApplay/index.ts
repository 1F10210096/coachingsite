export type Methods = {
  post: {
    reqBody: {
      id: string;
    };
    resBody: Application;
  };
};

export type Application = {
  id: string;
  roomId: string;
  bosyuuId: string;
  studentId: string;
  status: string;
  date: string;
  time: string;
  rating: number | null;
  review: string | null;
};
