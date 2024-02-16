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
      userId: string;
    };
    resBody: RoomWithLatestComment[];
  };
};
export type RoomWithLatestComment = {
  latestComment:
    | ({
        user: {
          name: string;
          imageUrl: string | null;
        };
      } & {
        id: string;
        roomId: string;
        userId: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
      })
    | null;
  commentUser: {
    name: string;
    imageUrl: string | null;
  } | null;
  // ... Include the rest of the properties that a room has ...
  status: string;

  // ... other properties from the room model ...
};
