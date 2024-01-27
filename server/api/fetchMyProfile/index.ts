import type { BosyuuListFrontModel, Name, UserSummaryModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: Name;
  };
};
