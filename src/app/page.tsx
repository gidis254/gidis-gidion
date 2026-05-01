import Link from "next/link";
import type { Product } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isDbUnavailableError } from "@/lib/db-fallback";
import { ProductCard } from "@/components/product-card";
import { ProductSlideshow } from "@/components/product-slideshow";

export default async function HomePage() {
  const featuredCategories = [
    "cookware",
    "bakeware",
    "appliances",
    "drinkware",
    "dinnerware",
  ] as const;

  let featuredByCategory: { category: string; slug: string; products: (Product & { category: { name: string } })[] }[] = [];
  let dbUnavailable = false;

  try {
    featuredByCategory = await Promise.all(
      featuredCategories.map(async (categorySlug) => {
        const products = await prisma.product.findMany({
          where: { category: { slug: categorySlug } },
          take: 4,
          orderBy: { createdAt: "desc" },
          include: { category: { select: { name: true } } },
        });

        return {
          category: products[0]?.category?.name || categorySlug,
          slug: categorySlug,
          products,
        };
      }),
    );
  } catch (error) {
    if (isDbUnavailableError(error)) {
      dbUnavailable = true;
      featuredByCategory = featuredCategories.map((categorySlug) => ({
        category: categorySlug,
        slug: categorySlug,
        products: [],
      }));
    } else {
      throw error;
    }
  }

  return (
    <div>
      <section className="w-full">
        <ProductSlideshow products={featuredByCategory.flatMap(({ products }) => products).slice(0, 12)} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {dbUnavailable && (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Product data is temporarily unavailable. Please check back shortly.
          </div>
        )}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Featured products
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Grouped by category with practical sample pricing (KES)
            </p>
          </div>
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-sky-700 hover:underline sm:inline"
          >
            View all →
          </Link>
        </div>
        <div className="space-y-10">
          {featuredByCategory.map(({ category, slug, products }) => (
            <div key={slug}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <Link
                  href={`/products?cat=${encodeURIComponent(slug)}`}
                  className="text-lg font-semibold text-slate-900 hover:text-sky-700"
                  aria-label={`View all ${category} products`}
                >
                  {category}
                </Link>
                <Link
                  href={`/products?cat=${encodeURIComponent(slug)}`}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
                >
                  View all
                </Link>
              </div>
              {products.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">
                  No products yet in this category.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
