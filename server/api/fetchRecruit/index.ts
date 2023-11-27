import type { BosyuuListModel } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      Id: string;
      ranks: string[];
      subjectRank: string[];
      tag: string[];
      roles: string[];
    };
    resBody: BosyuuListModel[];
  };
};