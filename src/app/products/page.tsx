import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { productSearchWhereFromQuery } from "@/lib/product-search";
import { ProductCard } from "@/components/product-card";

type Props = {
  searchParams: Promise<{ q?: string; cat?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { q, cat } = await searchParams;
  const query = q?.trim();

  const andParts: Prisma.ProductWhereInput[] = [];
  if (query) {
    const sw = productSearchWhereFromQuery(query);
    if (Object.keys(sw).length) andParts.push(sw);
  }
  if (cat && cat !== "all") andParts.push({ category: cat });

  const where: Prisma.ProductWhereInput | undefined =
    andParts.length > 0 ? { AND: andParts } : undefined;

  const products = await prisma.product.findMany({
    where,
    orderBy: { name: "asc" },
  });

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
  });
  const cats = categories.map((c) => c.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Shop kitchen equipment
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            {products.length} product{products.length === 1 ? "" : "s"}
            {query ? ` matching your search` : ""}
            {" · "}
            Prices in KES
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              !cat || cat === "all"
                ? "bg-slate-800 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            All
          </Link>
          {cats.map((c) => (
            <Link
              key={c}
              href={`/products?cat=${encodeURIComponent(c)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ${
                cat === c
                  ? "bg-slate-800 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-zinc-500">
          No products found. Try the{" "}
          <Link href="/search" className="text-sky-700 underline">
            search page
          </Link>{" "}
          or different filters.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
