import ProtectedPage from "@/components/ProtectedPage";
import CheckoutLayout from "@/app/checkout/layout";
import Checkout from "@/app/checkout/[plan]/page";

export default function CheckoutPage() {
  return (
    <ProtectedPage>
      <CheckoutLayout>
        <Checkout />
      </CheckoutLayout>
    </ProtectedPage>
  );
}
