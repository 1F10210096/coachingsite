import type { msgModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
      userId: string;
    };
  };
};
