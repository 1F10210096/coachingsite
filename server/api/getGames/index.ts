export type gameListModel = {
  id: number;
  title: string;
  genre: string;
};
export type Methods = {
  post: {
    resBody: gameListModel[];
  };
};
