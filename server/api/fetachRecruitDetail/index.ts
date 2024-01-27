import type {
  BosyuuListFrontModel,
  UserSummaryDetailModel,
  reviewModel2,
} from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: {
      bosyuuListFront: BosyuuListFrontModel;
      teacherProfile: UserSummaryDetailModel;
      reviewList: reviewModel2[];
    };
  };
};
