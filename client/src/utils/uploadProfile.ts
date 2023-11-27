import AWS from 'aws-sdk';

// AWS認証情報の設定
AWS.config.update({
  region: 'ap-northeast-1',
  accessKeyId: 'AKIAXOGIPRCJNCZVP72X',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

export async function uploadProfileImage(file) {
  console.log('Uploading file:', file);
  const fileName = file.name; // ファイル名を取得
  console.log('fileName:', fileName);
  const params = {
    Bucket: 'coach-user-profile',
    Key: `profile-images/${file.name}`,
    Body: file, // ファイルオブジェクトを直接セット
    ContentType: file.type,
  };

  try {
    const response = await s3.upload(params).promise();
    return response.Location; // アップロードされたファイルのURLを返す
  } catch (error) {
    console.error('S3アップロードエラー:', error);
    throw error;
  }
}
