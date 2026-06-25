import type { Metadata } from "next";
import { MerchantShell } from "@/components/merchant-shell";
import { allProducts, getLowStockProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Merchant Inventory",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MerchantInventoryPage() {
  const lowStock = getLowStockProducts(20);
  const outOfStock = allProducts.filter((product) => product.stock <= 0);
  const stocked = allProducts.filter((product) => product.stock > 0);

  return (
    <MerchantShell>
      <section className="grid gap-4 md:grid-cols-3">
        <InventoryMetric label="Stocked products" value={stocked.length} />
        <InventoryMetric label="Out of stock" value={outOfStock.length} />
        <InventoryMetric label="Low stock watchlist" value={lowStock.length} />
      </section>

      <section className="mt-6 rounded-lg border border-border bg-surface p-5">
        <h2 className="text-xl font-black">Low stock watchlist</h2>
        <div className="mt-4 grid gap-3">
          {lowStock.map((product) => (
            <div key={product.id} className="grid gap-3 rounded-md bg-background p-4 sm:grid-cols-[1fr_120px_180px]">
              <span className="font-bold">{product.title}</span>
              <span className="font-black text-brand">{product.stock} units</span>
              <input
                type="number"
                min={0}
                defaultValue={product.stock}
                className="min-h-11 rounded-md border border-border px-3"
              />
            </div>
          ))}
        </div>
      </section>
    </MerchantShell>
  );
}

function InventoryMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="text-sm font-bold text-muted">{label}</p>
      <p className="mt-2 text-3xl font-black text-brand">{value}</p>
    </div>
  );
}
