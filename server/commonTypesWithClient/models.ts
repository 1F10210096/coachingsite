/* eslint-disable max-lines */
import type { BosyuuList, Student } from '@prisma/client';
import { z } from 'zod';
import { taskIdParser } from '../service/idParsers';

export type UserModel = {
  userId: string;
  name: string;
  myProfile: string | null;
  rating?: number | null;
  imageUrl: string | null;
  created: Date;
  game?: string;
  studentId?: string;
  teacherId?: string;
};

export type gameRankModel = {
  userId: string;
  gameName: string;
  rank: number;
  user?: UserModel; // UserModelへの参照
};

export type StudentModel = {
  userId: string;
  user?: UserModel; // UserModelへの参照
};

export const taskParser = z.object({
  id: taskIdParser,
  label: z.string(),
  done: z.boolean(),
  created: z.number(),
});

export type TeacherModel = {
  userId: string;
  hitokoto: string;
  user: UserModel; // 必須の関連付け
  bosyuuLists: BosyuuListModel[]; // BosyuuListモデルへのリレーション
  // その他教師固有の属性があればここに追加
};

export type BosyuuListModel = {
  id: string;
  gameId: number;
  title: string;
  rank: number;
  subjectRank: number[];
  tag: string[];
  description: string;
  notes: string;
  myProfile: string;
  descriptionDetail: string;
  suchedule: string;
  lessonType: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
  teacher: TeacherModel; // 教師との必須の関連付け
};

export type GameListModel = {
  id: number;
  title: string;
};

export type GameRankPngModel = {
  id: string;
  gameId: string;
  rankId: number;
  user?: UserModel; // UserModelへの参照
};

export type UserSummaryModel = {
  name: string; // ユーザーの名前
  imageUrl: string; // ユーザーのイメージプロフィールのURL
  myProfile: string; // ユーザーのひと言コメント
  rating: number; // ユーザーの評価
};

export type UserSummaryDetailModel = {
  name: string; // ユーザーの名前
  imageUrl: string; // ユーザーのイメージプロフィールのURL
  myProfile: string; // ユーザーのひと言コメント
  rating: number; // ユーザーの評価
  Achievements: string; // ユーザーの実績
  hitokoto: string; // ユーザーの一言
};

export type reviewModel = {
  name: string; // ユーザーの名前
  imageUrl: string; // ユーザーのイメージプロフィールのURL
  rating: number; // ユーザーの評価
  review: string; // ユーザーの一言
};

export type TaskModel = z.infer<typeof taskParser>;

export type BosyuuListFrontModel = {
  id: string;
  gameId: number;
  title: string;
  rank: number;
  subjectRank: number[];
  tag: string[];
  description: string;
  notes: string;
  myProfile: string;
  descriptionDetail: string;
  suchedule: string;
  lessonType: string;
  teacherId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type msgModel = {
  id: string;
  content: string;
  createdAt: Date;
  roomId: string;
  updatedAt: Date;
  userId: string;
  userIdentity: number;
  userImageUrl: string;
};

export type ValoRankType = {
  アイアン: boolean;
  ブロンズ: boolean;
  シルバー: boolean;
  ゴールド: boolean;
  プラチナ: boolean;
  ダイヤモンド: boolean;
  アセンダント: boolean;
  イモータル: boolean;
  レディアント: boolean;
};

export type ApexRankType = {
  ブロンズ: boolean;
  シルバー: boolean;
  ゴールド: boolean;
  プラチナ: boolean;
  ダイヤモンド: boolean;
  マスター: boolean;
  プレデター: boolean;
};

export type FortNiteRankType = {
  ブロンズ: boolean;
  シルバー: boolean;
  ゴールド: boolean;
  プラチナ: boolean;
  ダイヤモンド: boolean;
  エリート: boolean;
  チャンピオン: boolean;
  アンリアル: boolean;
};

export type LolRankType = {
  アイアン: boolean;
  ブロンズ: boolean;
  シルバー: boolean;
  ゴールド: boolean;
  プラチナ: boolean;
  エメラルド: boolean;
  ダイヤモンド: boolean;
  マスター: boolean;
  グランドマスター: boolean;
  チャレンジャー: boolean;
};
export type StreetFigherRankType = {
  ルーキー: boolean;
  ブロンズ: boolean;
  シルバー: boolean;
  ゴールド: boolean;
  プラチナ: boolean;
  ダイヤモンド: boolean;
  マスター: boolean;
};

export type YuugiouRankType = {
  ルーキー: boolean;
  ブロンズ: boolean;
  シルバー: boolean;
  ゴールド: boolean;
  プラチナ: boolean;
  ダイヤモンド: boolean;
  マスター: boolean;
};

export type TagsType = {
  中級者歓迎: boolean;
  上級者向け: boolean;
  プロ向け: boolean;
  仲良くワイワイ: boolean;
  スパルタ指導: boolean;
  戦略: boolean;
  エイム強化: boolean;
  テクニック: boolean;
  キャラクター解析: boolean;
  マップ解析: boolean;
  武器ガイド: boolean;
  チームプレイ: boolean;
  ソロプレイ: boolean;
  メンタルトレーニング: boolean;
  ゲーム理論: boolean;
  パッチノート解説: boolean;
  リプレイ分析: boolean;
  'Q&Aセッション': boolean;
};

export type LessonTypesType = {
  一緒にプレイ: boolean;
  ビデオで学ぼう: boolean;
  '1 on 1': boolean;
  プレイを振り返ろう: boolean;
  プレイを見てもらおう: boolean;
  プレイを一緒に見よう: boolean;
  ゲームを一緒に学ぼう: boolean;
};

export type Application = {
  id: string;
  roomId: string;
  bosyuuId: string;
  studentId: string;
  status: string;
  date: string;
  time: string;
  rating: number | null;
  review: string | null;
};

export type newBosyuu = {
  id: string;
  gameId: number;
  title: string;
  rank: number;
  subjectRank: number[];
  tag: string[];
  lessonType: string;
  description: string;
  notes: string;
  myProfile: string;
  descriptionDetail: string;
  suchedule: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RoomWithoutHostId = {
  id: string;
  bosyuuId: string;
  participantId: string;
  createdAt: Date;
  status: string;
};

export type NewApp = {
  id: string;
  bosyuuId: string;
  studentId: string;
  status: string;
  date: Date;
  time: string;
  rating: number | null;
  review: string | null;
};

export type UserListItem = {
  id: string;
  gameId: number;
  title: string;
  rank: number;
  subjectRank: number[];
  tag: string[];
  lessonType: string;
  description: string;
  notes: string;
  myProfile: string;
  descriptionDetail: string;
  suchedule: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Name = {
  name: string;
};

export type BosyuuDetail = {
  id: number;
  gameId: number;
  title: string;
  rank: string;
  subjectRank: string;
  tag: string[];
  lessonType: string;
  description: string;
  notes: string;
  myProfile: string;
  descriptionDetail: string;
  suchedule: string; // note: check if this is a typo and should be 'schedule'
  createdAt: Date;
  updatedAt: Date;
  game: any; // replace 'any' with actual game type if available
  teacher: {
    Achievements: any; // replace 'any' with actual achievements type if available
    hitokoto: string;
    user: {
      name: string;
      myProfile: string;
      rating: number;
      imageUrl: string;
    };
  };
  apply: Array<{
    id: number;
    bosyuuId: number;
    rating: number;
    review: string;
    student: {
      user: {
        name: string;
        imageUrl: string;
      };
    };
  }>;
};

export type reviewModel2 = {
  name: string;
  imageUrl: string | null; // imageUrl を string | null に変更
  rating: number;
  review: string | null; // review も string | null に変更
};

export type CommentsWithImages = {
  userImageUrl: string | null | undefined;
  userIdentity: number;
  id: string;
  roomId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
export type ParticipantIdentity = {
  participantIdentity: number;
};

export type newComment = {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserImage = {
  imageUrl: string;
};

export type BosyuuListModel3 = {
  id: string; // またはstring
  gameId: number; // またはstring
  title: string;
  rank: number; // またはstring
  subjectRank: number[]; // またはstring[]
  tag: string[];
  description: string;
  suchedule: string; // 注意: タイポかもしれません（schedule?）
  myProfile: string;
  notes: string;
  lessonType: string;
  createdAt: Date;
  updatedAt: Date;
  teacher: {
    hitokoto: string;
    user: {
      imageUrl: string;
    };
    userId: string;
    bosyuuLists: BosyuuList[]; // この部分はBosyuuListの配列を想定
  };
  // 他の必要なBosyuuListのフィールドがあればここに追加
};

export type User3 = {
  userId: string;
  name: string;
  myProfile: string | null;
  rating: number | null;
  imageUrl: string | null;
  createdAt: Date;
};

export type RoomWithLatestComment = {
  latestComment:
    | ({
        user: {
          name: string;
          imageUrl: string | null;
        };
      } & {
        id: string;
        roomId: string;
        userId: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
      })
    | null;
  commentUser: {
    name: string;
    imageUrl: string | null;
  } | null;
  // ... Include the rest of the properties that a room has ...
  status: string;

  // ... other properties from the room model ...
};

export type NewApplyData = {
  id: string;
  roomId: string;
  bosyuuId: string;
  studentId: string;
  status: string;
  date: string; // データ型がstringのため、Date型への変換が必要かどうかはデータの使い方によります
  time: string;
  rating: number | null; // Float?はnumber型に対応し、nullが許容されます
  review: string | null; // String?はstring型に対応し、nullが許容されます
  bosyuu: BosyuuList; // この型は別途定義する必要があります
  student: Student; // この型は別途定義する必要があります
};

export type User = {
  userId: string;
  name: string;
};
