"use client";

import { CloudUpload } from "lucide-react";
import Dropzone from "react-dropzone";

export default function FileUploader() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(e.target);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Dropzone
        multiple={false}
        onDrop={async (acceptedFiles) => {
          console.log(acceptedFiles);
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
      </Dropzone>
    </form>
  );
}
