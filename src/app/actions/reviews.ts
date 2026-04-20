"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().max(2000).optional(),
});

export async function submitReview(formData: FormData): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) return;

  const parsed = reviewSchema.safeParse({
    productId: formData.get("productId"),
    rating: formData.get("rating"),
    comment: formData.get("comment") || undefined,
  });
  if (!parsed.success) return;

  const { productId, rating, comment } = parsed.data;

  await prisma.review.upsert({
    where: {
      productId_userId: {
        productId,
        userId: session.user.id,
      },
    },
    create: {
      productId,
      userId: session.user.id,
      rating,
      comment: comment || null,
    },
    update: { rating, comment: comment || null },
  });

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { slug: true },
  });
  if (product) revalidatePath(`/products/${product.slug}`);
}
