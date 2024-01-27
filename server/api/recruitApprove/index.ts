import type { Application } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
      bosyuuId: string;
      roomId: string;
      userId: string;
    };
    resBody: Application;
  };
};
