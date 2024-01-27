import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

console.log('dwadadsas');
dotenv.config();


function generateRandomFileName() {
  return `${uuidv4()}.jpg`; // UUIDの生成
}
const s3 = new AWS.S3();

export async function convertPngRepository(base64String: string) {
  console.log('dwadadsas');
  console.log(process.env.AWS_REGION);
  console.log(process.env.AWS_ACCESS_KEY_ID);
  console.log(process.env.AWS_SECRET_ACCESS_KEY);
  const fileName = generateRandomFileName();
  console.log('fileName:', fileName);
  const contentType = 'image/jpeg'; // MIMEタイプ
  const buffer = Buffer.from(base64String.replace(/^data:image\/\w+;base64,/, ''), 'base64');
  console.log('fileName:', fileName);
  const params = {
    Bucket: 'coach-user-profile',
    Key: `profile-images/${fileName}`,
    Body: buffer, // ファイルオブジェクトを直接セット
    ContentType: contentType,
  };
  console.log('fileName:', fileName);

  try {
    const response = await s3.upload(params).promise();
    return response.Location; // アップロードされたファイルのURLを返す
  } catch (error) {
    console.error('S3アップロードエラー:', error);
    throw error;
  }
}
