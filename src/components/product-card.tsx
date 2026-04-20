import Image from "next/image";
import Link from "next/link";
import type { Product } from "@prisma/client";
import { formatKes } from "@/lib/format-kes";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full bg-zinc-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-slate-900">
            Only {product.stock} left
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
          {product.category}
        </p>
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 group-hover:text-sky-800">
          {product.name}
        </h3>
        <p className="mt-auto pt-1 text-lg font-bold text-slate-800">
          {formatKes(product.price)}
        </p>
      </div>
    </Link>
  );
}
