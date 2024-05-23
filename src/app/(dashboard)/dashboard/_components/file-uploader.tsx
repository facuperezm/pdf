"use client";

import Dropzone from "react-dropzone";
import { getSignedURL } from "@/lib/actions/fileupload";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";
import { computeSHA256 } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";
import { uploadPdfToPinecone } from "@/server/pinecone";

export default function FileUploader() {
  const router = useRouter();
  const [file, setFile] = React.useState<number | null>();

  const handleFileUpload = async (file: File) => {
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      filePath: file.name,
      checksum: await computeSHA256(file),
    });
    if (signedURLResult.failure !== undefined) {
      toast.error(`${signedURLResult.failure}`);
      throw new Error(signedURLResult.failure);
    }
    const { url, id: fileId, fileName } = signedURLResult.success;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (res.ok) {
      toast.success(`File uploaded successfully`);
      await uploadPdfToPinecone(fileName);
    }

    setFile(fileId);
    router.push(`/dashboard/${fileId}`);
    return { fileId };
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] ?? null;
  //   setFile(file);
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     let fileId: string | undefined = undefined;
  //     if (file) {
  //       fileId = await handleFileUpload(file);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      {/* <div>
        <form onSubmit={handleSubmit}>
          <input
            name="media"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <Button type="submit">Upload</Button>
        </form>
      </div> */}
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFiles) => {
          if (acceptedFiles.length > 0) {
            try {
              const res = await handleFileUpload(acceptedFiles[0]);
            } catch (error) {
              console.error(error);
            } finally {
              console.log("file upload was successful");
            }
          }
        }}
      >
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-300 rounded-lg"
          >
            <div className="flex items-center justify-center size-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center size-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUpload className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-zinc-500">PDF (up to 4MB)</p>
                  {acceptedFiles.length > 0 && (
                    <p className="text-xs text-zinc-500">
                      {acceptedFiles[0].name}
                    </p>
                  )}
                </div>
                <input {...getInputProps()} type="file" id="dropzone-file" />
              </label>
            </div>
          </div>
        )}
      </Dropzone>
    </>
  );
}
