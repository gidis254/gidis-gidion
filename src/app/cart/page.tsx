import Link from "next/link";
import { getCart } from "@/app/actions/cart";
import { formatKes } from "@/lib/format-kes";
import { CartLine } from "@/components/cart-line";
import { CartCheckoutButton } from "@/components/cart-checkout-button";

export default async function CartPage() {
  const { items, subtotal } = await getCart();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Your cart</h1>
      <p className="mt-1 text-sm text-zinc-600">Totals in KES</p>

      {items.length === 0 ? (
        <div className="mt-10 py-16 text-center">
          <p className="text-zinc-600">Your cart is empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block font-semibold text-sky-700 hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {items.map((item) => (
            <CartLine key={item.id} item={item} />
          ))}
          <div className="flex items-center justify-between rounded-2xl bg-zinc-100 px-4 py-4">
            <span className="text-lg font-semibold text-slate-900">
              Subtotal
            </span>
            <span className="text-xl font-bold text-slate-900">
              {formatKes(subtotal)}
            </span>
          </div>
          <CartCheckoutButton />
        </div>
      )}
    </div>
  );
}
