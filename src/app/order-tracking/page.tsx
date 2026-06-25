import type { Metadata } from "next";
import { allOrders } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Order Tracking",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderTrackingPage() {
  const recent = allOrders.slice(0, 5);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-sm font-black uppercase text-accent">Tracking</p>
        <h1 className="mt-2 text-3xl font-black">Track an MHB order</h1>
        <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            name="order"
            placeholder="Order number or phone"
            className="min-h-11 rounded-md border border-border px-3"
          />
          <button type="submit" className="rounded-md bg-brand px-5 text-sm font-bold text-white">
            Track order
          </button>
        </form>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-surface p-6">
        <h2 className="text-xl font-black">Recent migrated orders</h2>
        <div className="mt-4 grid gap-3">
          {recent.map((order) => (
            <div key={order.id} className="grid gap-2 rounded-md bg-background p-4 sm:grid-cols-4">
              <span className="font-black">{order.name}</span>
              <span className="text-sm text-muted">{order.customer}</span>
              <span className="text-sm font-bold">{formatPrice(order.total)}</span>
              <span className="text-sm font-bold text-brand">{order.fulfillmentStatus}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
