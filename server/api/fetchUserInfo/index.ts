export type CommentsWithImages = {
  userImageUrl: string | null | undefined;
  userIdentity: number;
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
      userId: string;
    };
    resBody: CommentsWithImages[];
  };
};
