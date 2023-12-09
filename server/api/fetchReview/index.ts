import type { BosyuuListModel, reviewModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: reviewModel[];
  };
};
