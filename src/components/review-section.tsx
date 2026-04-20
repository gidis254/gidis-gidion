import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ReviewForm } from "@/components/review-form";

export async function ReviewSection({ productId }: { productId: string }) {
  const session = await auth();
  const reviews = await prisma.review.findMany({
    where: { productId },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  return (
    <section className="mt-10 pt-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">Customer reviews</h2>
        {reviews.length > 0 && (
          <p className="text-sm text-zinc-600">
            {avg.toFixed(1)} / 5 · {reviews.length} review
            {reviews.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-xl bg-zinc-50 p-4">
            <div className="mb-1 flex items-center gap-2">
              <span className="font-semibold text-slate-900">
                {r.user.name || r.user.email.split("@")[0]}
              </span>
              <span className="text-amber-500">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </span>
            </div>
            {r.comment && (
              <p className="text-sm text-zinc-700">{r.comment}</p>
            )}
          </li>
        ))}
      </ul>

      {reviews.length === 0 && (
        <p className="text-sm text-zinc-500">No reviews yet. Be the first.</p>
      )}

      <div className="mt-6">
        <ReviewForm productId={productId} isSignedIn={!!session?.user} />
      </div>
    </section>
  );
}
