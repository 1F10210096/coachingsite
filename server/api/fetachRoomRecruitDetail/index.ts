import type { BosyuuListFrontModel, BosyuuListModel, UserListItem } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody:  UserListItem;
  };
};
