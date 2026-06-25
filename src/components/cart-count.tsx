"use client";

import { useCart } from "@/components/cart-provider";

export function CartCount() {
  const { count } = useCart();

  return (
    <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-accent px-1.5 text-xs font-bold text-white">
      {count}
    </span>
  );
}
