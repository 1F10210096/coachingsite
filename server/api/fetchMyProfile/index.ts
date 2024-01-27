import type { Name } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: Name;
  };
};
