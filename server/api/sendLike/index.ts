export type newComment = {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
export type Methods = {
  post: {
    reqBody: {
      Id: string;
      myId: string;
    };
    resBody: newComment;
  };
};
