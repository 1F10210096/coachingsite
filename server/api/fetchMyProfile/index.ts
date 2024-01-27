export type Name = {
  name: string;
};

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: Name;
  };
};
