import ProtectedPage from "@/components/ProtectedPage";
import CheckoutLayout from "@/app/checkout/layout";
import Checkout from "@/app/checkout/[plan]/page";

export default function CheckoutPage() {
  return (
    <div className="bg-ocean-950 text-slate-100 min-h-screen">
      <ProtectedPage>
        <CheckoutLayout>
          <Checkout />
        </CheckoutLayout>
      </ProtectedPage>
    </div>
  );
}
