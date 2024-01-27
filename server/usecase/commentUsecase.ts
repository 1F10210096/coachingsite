import { commentRepository } from '$/repository/commentRepository';
import assert from 'assert';
export const commentUsecase = {
  fetchinfo: async (Id: string, userId: string, message: string) => {
    console.log('createU');
    const comment = await commentRepository(Id, userId, message);
    assert(comment !== null, 'commentrはnullです');
    return comment;
  },
};
