import type { BosyuuListFrontModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      roomId: string;
    };
    resBody: BosyuuListFrontModel;
  };
};
