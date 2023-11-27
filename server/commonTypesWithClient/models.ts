import { z } from 'zod';
import { taskIdParser } from '../service/idParsers';

export type UserModel = {
  userId: string;
  name: string;
  myProfile: string | null;
  imageUrl: string | null;
  created: number;
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
  gameId: string;
  title: string;
  rank: string[];
  subjectRank: string[];
  role: string[];
  tag: string[];
  description: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
  teacher: TeacherModel; // 教師との必須の関連付け
};

export type GameListModel = {
  id: string;
  title: string;
  icon: string;
};

export type TaskModel = z.infer<typeof taskParser>;
