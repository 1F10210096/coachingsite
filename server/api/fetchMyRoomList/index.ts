import type { RoomWithoutHostId } from '$/commonTypesWithClient/models';

export type Methods = {
  post: {
    reqBody: {
      roomId: string;
    };
    resBody: RoomWithoutHostId[];
  };
};
