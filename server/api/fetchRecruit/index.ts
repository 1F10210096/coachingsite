import type { BosyuuListModel3 } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: number;
      ranks: number[];
      subjectRank: number[];
      tag: string[];
      lessonTypes: string[];
    };
    resBody: BosyuuListModel3[];
  };
};
