export type Application = {
  id: string;
  bosyuuId: string;
  hostId: string;
  participantId: string;
  createdAt: string;
  status: string;
};

export type Methods = {
  post: {
    reqBody: {
      bosyuuId: string;
      roomId: string;
      userId: string;
      date: string;
      time: string;
    };
  };
};
