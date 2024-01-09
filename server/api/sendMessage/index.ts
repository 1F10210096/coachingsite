import type { UserModel } from '$/commonTypesWithClient/models';
// Define the types for the methods of your API endpoint
export type Methods = {
  post: {
    reqBody: {
      Id: string;
      userId: string;
      message: string;
    };
    resBody: UserModel;
  };
};
