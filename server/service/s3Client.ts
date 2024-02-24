import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  endpoint: 's3.ap-northeast-1.amazonaws.com',
  region: 'ap-northeast-1',
  forcePathStyle: true,
  credentials: {
    accessKeyId: 'AKIAXOGIPRCJK7OI32UX', // 環境変数が未設定の場合は空文字列を使用
    secretAccessKey: 'kzzbC6UaBCODXi52MMrUAfG5aGVQr4RVBYqrM3Bk', // 環境変数が未設定の場合は空文字列を使用
  },
});
