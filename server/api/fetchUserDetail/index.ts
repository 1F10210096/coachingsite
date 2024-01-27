import type { UserSummaryModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      teacherId: string;
    };
    resBody: UserSummaryModel;
  };
};
