import type { BosyuuListFrontModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      selectedId: string;
      rating: string;
      review : string;
    };
    resBody: BosyuuListFrontModel;
  };
};
