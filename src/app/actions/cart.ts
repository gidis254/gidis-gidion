"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { isDbUnavailableError } from "@/lib/db-fallback";
import { getGuestId } from "@/lib/guest";

async function cartWhere() {
  const session = await auth();
  if (session?.user?.id) {
    return { userId: session.user.id, guestId: null as string | null };
  }
  const guestId = await getGuestId();
  return { userId: null as string | null, guestId };
}

export async function getCart() {
  const w = await cartWhere();
  if (!w.userId && !w.guestId) {
    return { items: [], count: 0, subtotal: 0 };
  }
  try {
    const items = await prisma.cartItem.findMany({
      where: w.userId ? { userId: w.userId } : { guestId: w.guestId! },
      include: { product: true },
    });
    const count = items.reduce((s, i) => s + i.quantity, 0);
    const subtotal = items.reduce((s, i) => s + i.quantity * i.product.price, 0);
    return { items, count, subtotal };
  } catch (error) {
    if (isDbUnavailableError(error)) {
      return { items: [], count: 0, subtotal: 0 };
    }
    throw error;
  }
}

export async function addToCart(productId: string, quantity = 1) {
  const w = await cartWhere();
  if (!w.userId && !w.guestId) return { error: "Try again" };
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product || product.stock < 1) return { error: "Unavailable" };

  const existing = await prisma.cartItem.findFirst({
    where: {
      productId,
      ...(w.userId ? { userId: w.userId } : { guestId: w.guestId! }),
    },
  });

  const nextQty = (existing?.quantity ?? 0) + quantity;
  if (nextQty > product.stock) return { error: "Not enough stock" };

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: nextQty },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        productId,
        quantity: nextQty,
        userId: w.userId,
        guestId: w.guestId,
      },
    });
  }
  revalidatePath("/");
  revalidatePath("/cart");
  revalidatePath("/products");
  return { ok: true };
}

export async function updateCartItem(cartItemId: string, quantity: number) {
  const w = await cartWhere();
  const item = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      ...(w.userId ? { userId: w.userId } : { guestId: w.guestId }),
    },
    include: { product: true },
  });
  if (!item) return { error: "Not found" };
  if (quantity < 1) {
    await prisma.cartItem.delete({ where: { id: cartItemId } });
  } else {
    if (quantity > item.product.stock) return { error: "Not enough stock" };
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }
  revalidatePath("/cart");
  return { ok: true };
}

export async function removeCartItem(cartItemId: string) {
  const w = await cartWhere();
  await prisma.cartItem.deleteMany({
    where: {
      id: cartItemId,
      ...(w.userId ? { userId: w.userId } : { guestId: w.guestId }),
    },
  });
  revalidatePath("/cart");
  return { ok: true };
}
