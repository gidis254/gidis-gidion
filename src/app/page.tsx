import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export default async function HomePage() {
  const featuredCategories = [
    "Major Equipment",
    "Crockery (Dinnerware)",
    "Glassware",
    "Cutlery & Hand Utensils",
    "Inclusive Tools",
  ] as const;

  const featuredByCategory = await Promise.all(
    featuredCategories.map(async (category) => {
      const products = await prisma.product.findMany({
        where: { category },
        take: 4,
        orderBy: { createdAt: "desc" },
      });

      return { category, products };
    }),
  );

  return (
    <div>
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:py-20">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Equip your kitchen — we supply &amp; install
            </h1>
            <p className="mt-4 max-w-xl text-lg text-zinc-300">
              Professional tools, appliances, and utensils. All prices in{" "}
              <strong className="text-white">Kenyan shillings (KES)</strong>. Use
              the search bar above to find anything in our catalog.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex rounded-xl bg-sky-500 px-6 py-3 font-bold text-white shadow-lg hover:bg-sky-400"
              >
                Shop now
              </Link>
              <Link
                href="/register"
                className="inline-flex rounded-xl bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20"
              >
                Create account
              </Link>
            </div>
          </div>
          <div className="mt-10 grid flex-1 grid-cols-2 gap-3 text-sm lg:mt-0">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="font-bold text-sky-200">Installation</p>
              <p className="mt-1 text-zinc-300">
                Expert fitting for your equipment.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
              <p className="font-bold text-sky-200">Reviews</p>
              <p className="mt-1 text-zinc-300">
                Real buyers rate every product.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
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
          {featuredByCategory.map(({ category, products }) => (
            <div key={category}>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                {category}
              </h3>
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
