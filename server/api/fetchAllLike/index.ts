export type Favarite = {
  id: string;
  studentId: string;
  bosyuuListId: string;
  createdAt: Date;
};
export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: Favarite[] | null;
  };
};
