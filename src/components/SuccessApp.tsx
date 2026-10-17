import AppLayout from "@/components/AppLayout";
import { Success } from "@/components/Status/Success";

export default function SuccessApp() {
  return (
    <AppLayout>
      <main className="min-h-[calc(100vh-96px)] bg-ocean-950 text-slate-100 flex items-center justify-center px-4 py-10">
        <Success />
      </main>
    </AppLayout>
  );
}
