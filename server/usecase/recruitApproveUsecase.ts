import { applyApproveRepository } from '$/repository/applayApproveRepository';
import { applayRepository } from '$/repository/applayRepository';
import { approveRepository } from '$/repository/approveRepository';
import assert from 'assert';
export const recruitApproveUsecase = {
  fetchinfo: async (Id: string, bosyuuId: string, roomId: string, userId: string) => {
    console.log('createU');
    console.log(userId);
    const user = await approveRepository(Id, bosyuuId, roomId, userId);
    assert(user !== null, 'userはnullです');
  },
  sendInfo: async (
    bosyuuId: string,
    roomId: string,
    userId: string,
    date: string,
    time: string
  ) => {
    console.log('createU');
    console.log(userId);
    const user = await applayRepository(bosyuuId, roomId, userId, date, time);
    assert(user !== null, 'userはnullです');
    return user;
  },
  approveInfo: async (id: string) => {
    console.log('lllllllll');
    const user = await applyApproveRepository(id);
    assert(user !== null, 'userはnullです');
    return user;
  },
};
