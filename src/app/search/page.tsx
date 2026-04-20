import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isDbUnavailableError } from "@/lib/db-fallback";
import { productSearchWhereFromQuery } from "@/lib/product-search";
import { ProductCard } from "@/components/product-card";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const searchWhere = productSearchWhereFromQuery(query);

  let products: Awaited<ReturnType<typeof prisma.product.findMany>> = [];
  let dbUnavailable = false;

  try {
    products = await prisma.product.findMany({
      where: searchWhere,
      orderBy: { name: "asc" },
    });
  } catch (error) {
    if (isDbUnavailableError(error)) {
      dbUnavailable = true;
    } else {
      throw error;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {dbUnavailable && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Search is temporarily unavailable while product data reconnects.
        </div>
      )}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {query ? `Search results for “${query}”` : "Search"}
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          {query
            ? `${products.length} product${products.length === 1 ? "" : "s"} found · Search matches names, descriptions, and categories`
            : "Enter a word in the search bar above to find products."}
        </p>
        <p className="mt-2 text-sm">
          <Link href="/products" className="font-medium text-sky-700 hover:underline">
            Browse all categories
          </Link>
        </p>
      </div>

      {!query ? (
        <p className="py-16 text-center text-zinc-500">
          Use the search box in the header to find kitchen equipment.
        </p>
      ) : products.length === 0 ? (
        <p className="py-16 text-center text-zinc-500">
          No products match those words. Try different keywords or{" "}
          <Link href="/products" className="text-sky-700 underline">
            view the full catalog
          </Link>
          .
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
