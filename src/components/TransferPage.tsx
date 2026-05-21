import ProtectedPage from "@/components/ProtectedPage";
import { FileForm } from "@/components/FileForm/FileForm";

export default function TransferPage() {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4 py-10">
        <FileForm />
      </div>
    </ProtectedPage>
  );
}
