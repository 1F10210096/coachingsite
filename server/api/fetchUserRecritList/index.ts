import type { msgModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      name: string;
      rating: string;
      profile: string;
    };
  };
};
