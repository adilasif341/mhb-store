"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/format";

export function CartPageClient() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-lg border border-border bg-surface p-8 text-center">
        <h1 className="text-3xl font-black">Your cart is empty</h1>
        <p className="mt-3 text-muted">Add skincare or hair care products to start an order.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex rounded-md bg-brand px-5 py-3 text-sm font-bold text-white"
        >
          Shop products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.slug} className="grid gap-4 rounded-lg border border-border bg-surface p-4 sm:grid-cols-[96px_1fr_auto]">
            <div className="relative aspect-square overflow-hidden rounded-md bg-surface-muted">
              <Image src={item.image} alt={item.title} fill sizes="96px" className="object-cover" />
            </div>
            <div>
              <Link href={`/products/${item.slug}`} className="font-black hover:text-brand">
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-muted">{item.category}</p>
              <p className="mt-3 font-bold text-brand">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2 sm:flex-col sm:items-end">
              <input
                aria-label={`Quantity for ${item.title}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => updateQuantity(item.slug, Number(event.target.value))}
                className="h-11 w-20 rounded-md border border-border px-3"
              />
              <button
                type="button"
                onClick={() => removeItem(item.slug)}
                className="rounded-md border border-border px-3 py-2 text-sm font-bold text-muted hover:border-accent hover:text-accent"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-lg border border-border bg-surface p-5">
        <h2 className="text-xl font-black">Order summary</h2>
        <div className="mt-4 grid gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span className="font-bold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Shipping</span>
            <span className="font-bold">Calculated at checkout</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between text-lg font-black">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-5 flex min-h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-bold text-white hover:bg-brand-strong"
        >
          Continue to checkout
        </Link>
      </aside>
    </div>
  );
}
