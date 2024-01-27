import type { newBosyuu } from '$/commonTypesWithClient/models';
import { prismaClient } from '$/service/prismaClient';
// その他の必要なインポート

export const createBosyuuRepository = async (
  user: string,
  title: string,
  selectedGameIndex: number,
  selectedMyRankIndex: number,
  selectedRanksIndex: number[],
  lessonType: string,
  selectedTags: string[],
  achievement: string,
  description: string,
  notes: string,
  schedule: string
): Promise<newBosyuu> => {
  console.log('repositoryにきてるよ');
  console.log('user', user);
  console.log('title', title);
  console.log('selectedGame', selectedGameIndex);
  console.log('selectedMyRanks', selectedMyRankIndex);
  console.log('selectedRanks', selectedRanksIndex);
  console.log('selectedTags', selectedTags);
  console.log('achievement', achievement);
  console.log('description', description);
  console.log('notes', notes);
  console.log('schedule', schedule);

  try {
    const newBosyuu = await prismaClient.bosyuuList.create({
      data: {
        teacherId: user,
        title,
        gameId: selectedGameIndex,
        rank: selectedMyRankIndex,
        subjectRank: selectedRanksIndex,
        lessonType,
        tag: selectedTags,
        myProfile: achievement,
        description,
        descriptionDetail: '',
        suchedule: schedule, // Corrected the typo in 'schedule'
        notes,
      },
    });

    console.log('newBosyuu', newBosyuu);
    return newBosyuu;
  } catch (error) {
    console.error('Error creating new Bosyuu', error);
    throw error; // or handle the error as needed
  }
};
