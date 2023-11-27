import type { UserModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      userId: string;
      newName: string;
      newProfile: string | undefined;
      imageUrl: string | undefined;
    };
    resBody: UserModel;
  };
};
