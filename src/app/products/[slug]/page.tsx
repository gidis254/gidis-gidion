import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatKes } from "@/lib/format-kes";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ReviewSection } from "@/components/review-section";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });
  if (!product) return { title: "Product" };
  return {
    title: `${product.name} | Gidis Kitchen Shop`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-sky-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-sky-600">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-800">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">
            {product.category}
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-slate-800">
            {formatKes(product.price)}
          </p>
          <p className="mt-1 text-sm text-zinc-500">Price in Kenyan shillings (KES)</p>
          <p className="mt-4 leading-relaxed text-zinc-600">
            {product.description}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            {product.stock > 0 ? (
              <span className="text-sky-800">
                In stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600">Out of stock</span>
            )}
          </p>
          <div className="mt-8 max-w-sm">
            <AddToCartButton
              productId={product.id}
              disabled={product.stock < 1}
            />
          </div>
        </div>
      </div>

      <ReviewSection productId={product.id} />
    </div>
  );
}
