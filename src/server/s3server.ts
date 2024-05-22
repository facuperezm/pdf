import { generateFileName } from "@/lib/utils";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import fs from "fs";
import axios from "axios";

export const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function downloadFromURL(fileKey: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: process.env.AWS_BUCKET_REGION!,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY!,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        },
      });
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileKey,
      };

      const obj = await s3.getObject(params);

      const file_name = `/tmp/local-${generateFileName()}.pdf`;
      if (obj.Body instanceof require("stream").Readable) {
        const file = fs.createWriteStream(file_name);
        file.on("open", function (fd) {
          // @ts-ignore
          obj.Body?.pipe(file).on("finish", () => {
            return resolve(file_name);
          });
        });
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
