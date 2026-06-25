import type { Metadata } from "next";
import { CheckoutClient } from "@/app/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <CheckoutClient />
    </div>
  );
}
