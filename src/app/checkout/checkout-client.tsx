"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const payload = {
      customer: Object.fromEntries(formData.entries()),
      items,
      subtotal,
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json()) as { orderNumber: string };
    setOrderNumber(data.orderNumber);
    clearCart();
    setIsSubmitting(false);
  }

  if (orderNumber) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <p className="text-sm font-black uppercase text-accent">Order received</p>
        <h1 className="mt-2 text-3xl font-black">{orderNumber}</h1>
        <p className="mt-3 text-muted">
          The merchant dashboard can now use this order flow when database persistence is connected.
        </p>
        <Link
          href="/order-tracking"
          className="mt-6 inline-flex rounded-md bg-brand px-5 py-3 text-sm font-bold text-white"
        >
          Track order
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg border border-border bg-surface p-5">
        <h1 className="text-3xl font-black">Checkout</h1>
        <div className="grid gap-3 sm:grid-cols-2">
          <input required name="name" placeholder="Full name" className="min-h-11 rounded-md border border-border px-3" />
          <input required name="phone" placeholder="Phone" className="min-h-11 rounded-md border border-border px-3" />
          <input name="email" type="email" placeholder="Email" className="min-h-11 rounded-md border border-border px-3 sm:col-span-2" />
          <input required name="address" placeholder="Address" className="min-h-11 rounded-md border border-border px-3 sm:col-span-2" />
          <input required name="city" placeholder="City" className="min-h-11 rounded-md border border-border px-3" />
          <select name="paymentMethod" className="min-h-11 rounded-md border border-border px-3">
            <option>Cash on Delivery</option>
            <option>Bank Transfer</option>
          </select>
        </div>
        <textarea
          name="notes"
          placeholder="Order notes"
          rows={4}
          className="rounded-md border border-border px-3 py-3"
        />
        <button
          type="submit"
          disabled={!items.length || isSubmitting}
          className="min-h-11 rounded-md bg-brand px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-muted"
        >
          {isSubmitting ? "Placing order" : "Place order"}
        </button>
      </form>

      <aside className="h-fit rounded-lg border border-border bg-surface p-5">
        <h2 className="text-xl font-black">Items</h2>
        <div className="mt-4 grid gap-3">
          {items.length ? (
            items.map((item) => (
              <div key={item.slug} className="flex justify-between gap-3 text-sm">
                <span className="text-muted">
                  {item.quantity} x {item.title}
                </span>
                <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted">Your cart is empty.</p>
          )}
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <div className="flex justify-between text-lg font-black">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
