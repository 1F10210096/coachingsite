import type { BosyuuListModel } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
// その他の必要なインポート

export const createBosyuuRepository = async (
  userId: string,
  selectedGame: string,
  selectedRanks: string[],
  coachContent: string,
  suchedule: string,
  OneWord: string
): Promise<BosyuuListModel> => {
  // 関連する教師とゲーム情報を取得
  console.log('repositoryにきてるよ');
  const teacher = await prismaClient.teacher.findUnique({
    where: { userId },
  });
  console.log('teacher', teacher);

  const userGameRank = await prismaClient.gameRank.findFirst({
    where: {
      userId,
      gameName: selectedGame,
    },
  });

  const gameList = await prismaClient.gameList.findFirst({
    where: {
      title: selectedGame,
    },
  });

console.log('userGameRank',userGameRank);
  if (!userGameRank) {
    throw new Error('ユーザーのゲームランクが見つかりません');
  }
  console.log('userGameRank',userGameRank);

  // 新しいBosyuuListの作成
  const newBosyuu = await prismaClient.bosyuuList.create({
    data: {
      gameId: gameList.id,
      title: coachContent, // このフィールドはビジネスロジックによって異なる可能性があります
      rank: [userGameRank.rank],
      subjectRank: selectedRanks,
      tag: [], // このフィールドは適宜設定
      description: coachContent,
      suchedule,
      OneWord,
      teacherId: teacher.userId,
      // その他の属性
    },
  });
  console.log('newBosyuu',newBosyuu);

  return toBosyuuListModel(newBosyuu); // 適切な変換関数を使用
};
