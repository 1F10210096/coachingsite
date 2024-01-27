import type { UserSummaryDetailModel, UserSummaryModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      teacherId: string;
    };
    resBody: UserSummaryModel;
  };
};
