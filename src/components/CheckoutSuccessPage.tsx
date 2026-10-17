import ProtectedPage from "@/components/ProtectedPage";
import CheckoutSuccess from "@/app/checkout/[plan]/success/page";

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-ocean-950 text-slate-100 min-h-screen">
      <ProtectedPage>
        <CheckoutSuccess />
      </ProtectedPage>
    </div>
  );
}
