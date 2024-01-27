export type GameListModel = {
  id: number;
  title: string;
};

export type Methods = {
  post: {
    resBody: GameListModel[];
  };
};
