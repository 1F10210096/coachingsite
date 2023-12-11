import type { BosyuuListFrontModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: BosyuuListFrontModel;
  };
};
