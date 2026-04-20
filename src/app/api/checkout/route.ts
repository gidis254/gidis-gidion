import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

/** Stripe treats KES as zero-decimal: `unit_amount` is whole shillings. */
export async function POST() {
  if (!stripe) {
    return NextResponse.json(
      { error: "Payments not configured. Add STRIPE_SECRET_KEY to .env" },
      { status: 503 }
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Sign in to complete your purchase" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (!items.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const lineItems = items.map((i) => ({
    price_data: {
      currency: "kes",
      product_data: {
        name: i.product.name,
        images: i.product.image ? [i.product.image] : [],
      },
      unit_amount: i.product.price,
    },
    quantity: i.quantity,
  }));

  const total = items.reduce((s, i) => s + i.quantity * i.product.price, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      status: "pending",
      total,
      items: {
        create: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.product.price,
        })),
      },
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
    metadata: {
      orderId: order.id,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: checkoutSession.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
