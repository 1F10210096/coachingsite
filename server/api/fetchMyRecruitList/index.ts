import type { NewApp, UserListItem } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: { user: UserListItem[]; user2: NewApp[] };
  };
};
