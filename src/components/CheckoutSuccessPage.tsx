import ProtectedPage from "@/components/ProtectedPage";
import CheckoutSuccess from "@/app/checkout/[plan]/success/page";

export default function CheckoutSuccessPage() {
  return (
    <ProtectedPage>
      <CheckoutSuccess />
    </ProtectedPage>
  );
}
