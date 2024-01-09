import { approveRepository } from '$/repository/approveRepository';
import assert from 'assert';
export const recruitApproveUsecase = {
  fetchinfo: async (Id: string, bosyuuId: string, roomId: string, userId: string) => {
    console.log('createU');
    console.log(userId);
    const user = await approveRepository(Id, bosyuuId, roomId, userId);
    assert(user !== null, 'userはnullです');
    return user;
  },
};
