"use server";

import { auth } from "@/auth";
import { db } from "@/server/db";
import { media } from "@/server/db/schema/media";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

type GetSignedURLParams = {
  fileSize: number;
  fileType: string;
  checksum: string;
};

// only allow pdf files
const allowedFileTypes = ["application/pdf"];

const maxFileSize = 1048576 * 40; // 4MB

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string; id: number } }
  | { failure: string; success?: undefined }
>;

const generateFileName = (bytes = 32) => {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return [...array].map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const getSignedURL = async ({
  fileSize,
  fileType,
  checksum,
}: GetSignedURLParams): SignedURLResponse => {
  const session = await auth();

  if (!session) {
    return { failure: "Not authenticated" };
  }

  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 } // 60 seconds
  );

  const results = await db
    .insert(media)
    .values({
      id: fileName,
      type: fileType,
      url: url.split("?")[0],
      userId: session.user.id,
    })
    .returning();

  return { success: { url, id: 0 } };
};

// export async function uploadPdf({ fileId }: { fileId?: number }) {
//   const session = await auth();

//   if (!session) {
//     return { failure: "Not authenticated" };
//   }

//   if (fileId) {
//     const result = await db
//       .select({ id: mediaTable.id })
//       .from(mediaTable)
//       .where(
//         and(eq(mediaTable.id, fileId), eq(mediaTable.userId, session.user.id))
//       )
//       .then((rows) => rows[0]);
//   }

//   console.log({ fileId }, "from uploadPdf");
//   return { success: "File uploaded" };
// }
