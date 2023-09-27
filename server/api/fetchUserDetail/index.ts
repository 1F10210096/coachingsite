import type { UserSummaryDetailModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      teacherId: string;
    };
    resBody: UserSummaryDetailModel;
  };
};
