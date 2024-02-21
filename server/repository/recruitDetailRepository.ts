/* eslint-disable complexity */
import { prismaClient } from '$/service/prismaClient';
import assert from 'assert';
/* eslint-disable max-lines */
import type {
  BosyuuListFrontModel,
  UserSummaryDetailModel,
  reviewModel2,
} from 'commonTypesWithClient/models';

export const recruitDetailRepository = {
  fetchinfo: async (
    Id: string
  ): Promise<{
    bosyuuListFront: BosyuuListFrontModel;
    teacherProfile: UserSummaryDetailModel;
    reviewList: reviewModel2[];
  }> => {
    const bosyuuDetail = await prismaClient.bosyuuList.findFirst({
      where: {
        id: Id,
      },
      select: {
        id: true,
        gameId: true,
        title: true,
        rank: true,
        subjectRank: true,
        tag: true,
        lessonType: true,
        description: true,
        notes: true,
        myProfile: true,
        descriptionDetail: true,
        suchedule: true,
        createdAt: true,
        updatedAt: true,
        teacherId: true,
        game: true,
        teacher: {
          select: {
            userId: false,
            Achievements: true,
            hitokoto: true,
            user: {
              select: {
                name: true,
                myProfile: true,
                rating: true,
                imageUrl: true,
              },
            },
          },
        },
        apply: {
          select: {
            id: true,
            bosyuuId: true,
            studentId: false,
            rating: true,
            review: true,
            student: {
              select: {
                user: {
                  select: {
                    name: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    console.log('bosyuuDetail', bosyuuDetail);

    assert(bosyuuDetail, 'Bosyuu not found');
    const bosyuuListFront: BosyuuListFrontModel = {
      id: bosyuuDetail.id,
      gameId: bosyuuDetail.gameId,
      title: bosyuuDetail.title,
      rank: bosyuuDetail.rank,
      subjectRank: bosyuuDetail.subjectRank,
      tag: bosyuuDetail.tag,
      lessonType: bosyuuDetail.lessonType,
      description: bosyuuDetail.description,
      notes: bosyuuDetail.notes,
      myProfile: bosyuuDetail.myProfile,
      descriptionDetail: bosyuuDetail.descriptionDetail,
      suchedule: bosyuuDetail.suchedule,
      teacherId: bosyuuDetail.teacherId,
      createdAt: bosyuuDetail.createdAt,
      updatedAt: bosyuuDetail.updatedAt,
    };

    const teacherProfile: UserSummaryDetailModel = {
      name: bosyuuDetail.teacher.user.name,
      imageUrl: bosyuuDetail.teacher.user.imageUrl ?? '',
      myProfile: bosyuuDetail.teacher.user.myProfile ?? '', // null の場合は空の文字列に設定
      rating: bosyuuDetail.teacher.user.rating ?? 0, // null の場合は 0 に設定
      Achievements: bosyuuDetail.teacher.Achievements,
      hitokoto: bosyuuDetail.teacher.hitokoto,
    };

    const reviewList: reviewModel2[] = bosyuuDetail.apply.map((apply) => ({
      name: apply.student.user.name,
      imageUrl: apply.student.user.imageUrl,
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      rating: apply.rating || 0,
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      review: apply.review || null,
    }));

    console.log('reviewList', reviewList);
    return {
      bosyuuListFront,
      teacherProfile,
      reviewList,
    };
  },
};
