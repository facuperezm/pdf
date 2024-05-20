import { S3 } from "@aws-sdk/client-s3";
export async function downloadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.AWS_SECRET_ACCESS_KEY!,
          secretAccessKey: process.env.AWS_SECRET_SECRET_KEY!,
        },
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      };
    } catch (error) {
      console.error(error);
      reject(error);
      return null;
    }
  });
}
