"use server";

import { auth } from "@/auth";
import { db } from "@/server/db";
import media from "@/server/db/schema/media";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { generateFileName } from "../utils";
import { s3Client } from "@/server/s3server";
import { uploadPdfToPinecone } from "@/server/pinecone";

type GetSignedURLParams = {
  fileSize: number;
  fileType: string;
  filePath: string;
  checksum: string;
};

type SignedURLResponse = Promise<
  | {
      failure?: undefined;
      success: { url: string; id: number; fileName: string };
    }
  | { failure: string; success?: undefined }
>;

// only allow pdf files
const allowedFileTypes = ["application/pdf"];
// 4MB max file size
const maxFileSize = 1048576 * 40; // 4MB

export const getSignedURL = async ({
  fileSize,
  fileType,
  filePath,
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

  // thought it would be cool to generate a random name for the file
  // might implement this later
  // const referenceName = await generateRandomName();

  const results = await db
    .insert(media)
    .values({
      name: filePath,
      fileKey: fileName,
      url: url.split("?")[0],
      userId: session.user.id,
    })
    .returning();

  revalidatePath("/dashboard");
  return { success: { url, id: results[0].id, fileName } };
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
