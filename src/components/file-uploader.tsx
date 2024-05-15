"use client";

import Dropzone from "react-dropzone";
import { Button } from "./ui/button";
import { getSignedURL } from "@/lib/actions/fileupload";
import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  };

  const handleFileUpload = async (file: File) => {
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
    });
    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure);
    }
    const { url, id: fileId } = signedURLResult.success;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    const fileUrl = url.split("?")[0];
    return fileId;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let fileId: number | undefined = undefined;
      if (file) {
        fileId = await handleFileUpload(file);
      }

      // await uploadPdf({ fileId });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            name="media"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <Button type="submit">Upload</Button>
        </form>
      </div>
      {/* <Dropzone
        multiple={false}
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
          }
          handleSubmit();
        }}
      >
        {({ getRootProps, getInputProps }) => (
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
                </div>
                <input {...getInputProps()} type="file" id="dropzone-file" />
              </label>
            </div>
          </div>
        )}
      </Dropzone> */}
    </>
  );
}
