"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function registerUser(formData: FormData) {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name") || undefined,
  };
  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) redirect("/register?error=invalid");
  const { email, password, name } = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) redirect("/register?error=exists");

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, passwordHash, name: name || null },
  });

  redirect("/login?registered=1");
}

export async function mergeGuestCart() {
  const session = await auth();
  if (!session?.user?.id) return { ok: false };
  const userId = session.user.id;
  const { getGuestId } = await import("@/lib/guest");
  const guestId = await getGuestId();
  if (!guestId) return { ok: true };
  const guestItems = await prisma.cartItem.findMany({
    where: { guestId, userId: null },
  });
  for (const g of guestItems) {
    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId: g.productId },
    });
    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + g.quantity },
      });
      await prisma.cartItem.delete({ where: { id: g.id } });
    } else {
      await prisma.cartItem.update({
        where: { id: g.id },
        data: { userId, guestId: null },
      });
    }
  }
  return { ok: true };
}
