import dotenv from 'dotenv';
dotenv.config();

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

// 環境変数から認証情報とリージョンを読み込む
export const s3Client = new S3Client({
  region: process.env.region ?? '',
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.accessKeyId ?? '', // 環境変数が未設定の場合は空文字列を使用
    secretAccessKey: process.env.secretAccessKey ?? '', // 環境変数が未設定の場合は空文字列を使用
  },
});

async function convertPngRepository(base64String: string) {
  const fileName = `${uuidv4()}.jpg`; // UUIDでファイル名を生成
  const buffer = Buffer.from(base64String.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const params = {
    Bucket: 'coach-user-profile', // バケット名
    Key: `profile-images/${fileName}`, // オブジェクトのキー
    Body: buffer, // ファイルの内容
    ContentType: 'image/jpeg', // MIMEタイプ
  };

  try {
    // S3へのアップロード
    const command = new PutObjectCommand(params);
    const response = await s3Client.send(command);
    return `https://${params.Bucket}.s3.${process.env.S3_REGION}.amazonaws.com/${params.Key}`; // アップロードされたファイルのURLを返す
  } catch (error) {
    console.error('S3アップロードエラー:', error);
    throw error;
  }
}

export { convertPngRepository };
