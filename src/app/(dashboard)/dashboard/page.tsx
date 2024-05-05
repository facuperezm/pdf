import FileUploader from "@/components/file-uploader";
import { auth } from "../../../auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <>
      <div>{JSON.stringify(session, null, 2)}</div>
      <div>
        <FileUploader />
      </div>
    </>
  );
}
