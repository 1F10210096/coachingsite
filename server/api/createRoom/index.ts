export type RoomWithoutHostId = {
  id: string;
  bosyuuId: string;
  participantId: string;
  createdAt: Date;
  status: string;
};

export type Methods = {
  post: {
    reqBody: {
      Id: string;
      myId: string;
    };
    resBody: RoomWithoutHostId;
  };
};
