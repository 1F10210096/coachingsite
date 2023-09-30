import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
// その他の必要なインポート

export const createBosyuuRepository = async (
  user: string,
  title: string,
  selectedGame: string,
  selectedMyRanks: string,
  selectedRanks: string[],
  selectedTags: string[],
  achevement: string,
  description: string,
  notes: string,
  suchedule: string
): Promise<BosyuuListModel> => {
  // 関連する教師とゲーム情報を取得
  console.log('repositoryにきてるよ');
  // 新しいBosyuuListの作成
  console.log('user', user);
  const newBosyuu = await prismaClient.bosyuuList.create({
    data: {
      user,
      title,
      selectedGame,
      selectedMyRanks,
      selectedRanks,
      selectedTags,
      suchedule,
      achevement,
      description,
      notes,
    },
  });
  console.log('newBosyuu', newBosyuu);

  return toBosyuuListModel(newBosyuu); // 適切な変換関数を使用
};
