import type { Metadata } from "next";
import Link from "next/link";
import { MerchantShell, StatusBadge } from "@/components/merchant-shell";
import { allOrders, allProducts, allReviews, getLowStockProducts, getOrderStats } from "@/lib/catalog";
import { formatNumber, formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Merchant Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerchantDashboard() {
  const stats = getOrderStats();
  const lowStock = getLowStockProducts(5);
  const latestOrders = allOrders.slice(0, 6);
  const activeProducts = allProducts.filter((product) => product.status === "active").length;

  return (
    <MerchantShell>
      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="Revenue migrated" value={formatPrice(stats.revenue)} />
        <Metric label="Orders" value={formatNumber(stats.totalOrders)} />
        <Metric label="Pending fulfillment" value={formatNumber(stats.pending)} />
        <Metric label="Active products" value={formatNumber(activeProducts)} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Recent orders</h2>
            <Link href="/mhbgher22/orders" className="text-sm font-bold text-brand">
              Process orders
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {latestOrders.map((order) => (
              <div key={order.id} className="grid gap-3 rounded-md bg-background p-4 md:grid-cols-5">
                <div>
                  <p className="font-black">{order.name}</p>
                  <p className="text-sm text-muted">{order.customer}</p>
                </div>
                <p className="text-sm text-muted">{order.city || "No city"}</p>
                <p className="font-bold">{formatPrice(order.total)}</p>
                <StatusBadge value={order.financialStatus} />
                <StatusBadge value={order.fulfillmentStatus} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Low stock</h2>
            <Link href="/mhbgher22/inventory" className="text-sm font-bold text-brand">
              Inventory
            </Link>
          </div>
          <div className="mt-4 grid gap-3">
            {lowStock.map((product) => (
              <div key={product.id} className="rounded-md bg-background p-4">
                <p className="font-bold">{product.title}</p>
                <p className="mt-1 text-sm text-muted">{product.stock} units available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <Link href="/mhbgher22/products" className="rounded-lg border border-border bg-surface p-5 hover:border-brand">
          <p className="text-sm font-black uppercase text-accent">Catalog</p>
          <h2 className="mt-2 text-xl font-black">{allProducts.length} imported products</h2>
        </Link>
        <Link href="/mhbgher22/reviews" className="rounded-lg border border-border bg-surface p-5 hover:border-brand">
          <p className="text-sm font-black uppercase text-accent">Trust</p>
          <h2 className="mt-2 text-xl font-black">{allReviews.length} migrated reviews</h2>
        </Link>
        <Link href="/shop" className="rounded-lg border border-border bg-surface p-5 hover:border-brand">
          <p className="text-sm font-black uppercase text-accent">Storefront</p>
          <h2 className="mt-2 text-xl font-black">Open public shop</h2>
        </Link>
      </section>
    </MerchantShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="text-sm font-bold text-muted">{label}</p>
      <p className="mt-2 text-2xl font-black text-brand">{value}</p>
    </div>
  );
}
