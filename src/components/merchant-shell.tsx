import Link from "next/link";

const merchantLinks = [
  { href: "/mhbgher22", label: "Overview" },
  { href: "/mhbgher22/orders", label: "Orders" },
  { href: "/mhbgher22/products", label: "Products" },
  { href: "/mhbgher22/inventory", label: "Inventory" },
  { href: "/mhbgher22/reviews", label: "Reviews" },
];

export function MerchantShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="text-sm font-black uppercase text-accent">Merchant backend</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">MHB operations</h1>
      </div>
      <div className="scrollbar-none mb-6 flex gap-2 overflow-x-auto">
        {merchantLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="min-w-fit rounded-md border border-border bg-surface px-4 py-3 text-sm font-bold transition hover:border-brand hover:text-brand"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
}

export function StatusBadge({ value }: { value: string }) {
  const normalized = value.toLowerCase();
  const color =
    normalized.includes("fulfilled") || normalized.includes("paid") || normalized.includes("delivered")
      ? "bg-green-100 text-green-800"
      : normalized.includes("cancel") || normalized.includes("refund")
        ? "bg-red-100 text-red-800"
        : "bg-accent-soft text-brand";

  return (
    <span className={`inline-flex rounded-md px-2 py-1 text-xs font-black uppercase ${color}`}>
      {value || "pending"}
    </span>
  );
}
