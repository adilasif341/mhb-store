"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { CartProduct } from "@/lib/types";

export function AddToCartButton({
  product,
  label = "Add to cart",
  className = "",
}: {
  product: CartProduct;
  label?: string;
  className?: string;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-strong ${className}`}
      onClick={() => {
        addItem(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Added" : label}
    </button>
  );
}
