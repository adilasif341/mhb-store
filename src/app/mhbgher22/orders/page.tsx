import type { Metadata } from "next";
import { MerchantShell } from "@/components/merchant-shell";
import { allOrders } from "@/lib/catalog";
import { OrderBoardClient } from "@/app/mhbgher22/orders/order-board-client";

export const metadata: Metadata = {
  title: "Merchant Orders",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerchantOrdersPage() {
  return (
    <MerchantShell>
      <OrderBoardClient orders={allOrders} />
    </MerchantShell>
  );
}
