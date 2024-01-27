import type { BosyuuListFrontModel, BosyuuListModel, CommentsWithImages, msgModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
      userId: string;
    };
    resBody: CommentsWithImages[];
  };
};
