"use client";

import { useEffect, useMemo, useState } from "react";
import { StatusBadge } from "@/components/merchant-shell";
import { formatPrice } from "@/lib/format";
import type { StoreOrder } from "@/lib/types";

const statuses = ["unfulfilled", "confirmed", "packed", "shipped", "delivered", "cancelled"];
const storageKey = "mhb-order-status-overrides-v1";

export function OrderBoardClient({ orders }: { orders: StoreOrder[] }) {
  const [filter, setFilter] = useState("all");
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return;
    let timeoutId = 0;

    try {
      const parsed = JSON.parse(stored) as Record<string, string>;
      timeoutId = window.setTimeout(() => setOverrides(parsed), 0);
    } catch {
      window.localStorage.removeItem(storageKey);
    }

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(overrides));
  }, [overrides]);

  const visibleOrders = useMemo(() => {
    return orders.filter((order) => {
      const status = overrides[order.id] || order.fulfillmentStatus || "unfulfilled";
      return filter === "all" || status === filter;
    });
  }, [filter, orders, overrides]);

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {["all", ...statuses].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-md border px-4 py-2 text-sm font-bold ${
              filter === status
                ? "border-brand bg-brand text-white"
                : "border-border bg-surface text-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {visibleOrders.map((order) => {
        const status = overrides[order.id] || order.fulfillmentStatus || "unfulfilled";

        return (
          <article key={order.id} className="rounded-lg border border-border bg-surface p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">{order.name}</h2>
                  <StatusBadge value={order.financialStatus} />
                  <StatusBadge value={status} />
                </div>
                <p className="mt-2 text-sm text-muted">
                  {order.customer} - {order.city || "No city"} - {order.phone || "No phone"}
                </p>
              </div>
              <div className="text-left lg:text-right">
                <p className="text-2xl font-black text-brand">{formatPrice(order.total)}</p>
                <p className="text-sm text-muted">{order.paymentMethod}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 rounded-md bg-background p-4">
              {order.items.map((item) => (
                <div key={`${order.id}-${item.title}`} className="flex justify-between gap-4 text-sm">
                  <span>
                    {item.quantity} x {item.title}
                  </span>
                  <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[220px_1fr]">
              <select
                value={status}
                onChange={(event) =>
                  setOverrides((current) => ({ ...current, [order.id]: event.target.value }))
                }
                className="min-h-11 rounded-md border border-border px-3"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <input
                placeholder="Courier tracking number"
                className="min-h-11 rounded-md border border-border px-3"
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
