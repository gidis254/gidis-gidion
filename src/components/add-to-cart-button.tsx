"use client";

import { useTransition } from "react";
import { addToCart } from "@/app/actions/cart";

export function AddToCartButton({
  productId,
  disabled,
}: {
  productId: string;
  disabled?: boolean;
}) {
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      disabled={disabled || pending}
      onClick={() => start(() => void addToCart(productId, 1))}
      className="w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Adding…" : "Add to cart"}
    </button>
  );
}
