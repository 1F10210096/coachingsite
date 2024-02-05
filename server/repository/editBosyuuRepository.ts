import type { newBosyuu } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
// その他の必要なインポート

export const editBosyuuRepository = async (
  id: string,
  title: string,
  selectedGameIndex: number,
  selectedMyRankIndex: number,
  selectedRanksIndex: number[],
  lessonType: string,
  selectedTags: string[],
  description: string,
  notes: string,
  schedule: string
): Promise<newBosyuu> => {
  console.log('repositoryにきてるよ');
  console.log('title', title);
  console.log('selectedGame', selectedGameIndex);
  console.log('selectedMyRanks', selectedMyRankIndex);
  console.log('selectedRanks', selectedRanksIndex);
  console.log('selectedTags', selectedTags);
  console.log('description', description);
  console.log('notes', notes);
  console.log('schedule', schedule);

  try {
    // ここでprismaのupdateメソッドを使用して、特定のIDのレコードを更新
    const updatedBosyuu = await prismaClient.bosyuuList.update({
      where: {
        id, // レコードを特定するためのID
      },
      data: {
        // 更新したいフィールドのデータ
        title,
        gameId: selectedGameIndex,
        rank: selectedMyRankIndex,
        subjectRank: selectedRanksIndex,
        lessonType,
        tag: selectedTags,
        description,
        descriptionDetail: '', // 必要であれば適切な値に更新
        suchedule: schedule, // 正しい綴りに修正
        notes,
        // 他のフィールドがあればここに追加
      },
    });

    console.log('updatedBosyuu', updatedBosyuu);
    return updatedBosyuu;
  } catch (error) {
    console.error('Error updating Bosyuu', error);
    throw error; // エラー処理は必要に応じて
  }
};
