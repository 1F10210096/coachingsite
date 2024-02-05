export type Application = {
  id: string;
  bosyuuId: string;
  hostId: string;
  participantId: string;
  createdAt: Date;
  status: string;
};

export type Methods = {
  post: {
    reqBody: {
      bosyuuId: string;
      roomId: string;
      userId: string;
      date: any;
      time: string;
    };
    resBody: Application;
  };
};
