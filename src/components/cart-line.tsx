"use client";

import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { removeCartItem, updateCartItem } from "@/app/actions/cart";
import { formatKes } from "@/lib/format-kes";
import type { CartItem, Product } from "@prisma/client";

export function CartLine({
  item,
}: {
  item: CartItem & { product: Product };
}) {
  const [pending, start] = useTransition();

  return (
    <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-md">
      <Link
        href={`/products/${item.product.slug}`}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-100"
      >
        <Image
          src={item.product.image}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <Link
          href={`/products/${item.product.slug}`}
          className="font-semibold text-slate-900 hover:text-sky-700"
        >
          {item.product.name}
        </Link>
        <p className="text-sm text-zinc-600">
          {formatKes(item.product.price)} each
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              start(() => void updateCartItem(item.id, item.quantity - 1))
            }
            className="rounded-lg bg-zinc-100 px-2 py-0.5 text-sm hover:bg-zinc-200 disabled:opacity-50"
          >
            −
          </button>
          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              start(() => void updateCartItem(item.id, item.quantity + 1))
            }
            className="rounded-lg bg-zinc-100 px-2 py-0.5 text-sm hover:bg-zinc-200 disabled:opacity-50"
          >
            +
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => start(() => void removeCartItem(item.id))}
            className="ml-2 text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right font-bold text-slate-900">
        {formatKes(item.quantity * item.product.price)}
      </div>
    </div>
  );
}
