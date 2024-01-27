export type GameListModel = {
  id: number;
  title: string;
};

export type Methods = {
  post: {
    reqBody: {
      Id: string;
    };
    resBody: GameListModel[];
  };
};
