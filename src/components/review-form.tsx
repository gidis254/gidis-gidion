import { submitReview } from "@/app/actions/reviews";

export function ReviewForm({
  productId,
  isSignedIn,
}: {
  productId: string;
  isSignedIn: boolean;
}) {
  if (!isSignedIn) {
    return (
      <p className="text-sm text-zinc-600">
        <a href="/login" className="font-semibold text-sky-700 hover:underline">
          Sign in
        </a>{" "}
        to write a review.
      </p>
    );
  }

  return (
    <form
      action={submitReview}
      className="max-w-lg space-y-3 rounded-xl bg-zinc-50 p-4"
    >
      <input type="hidden" name="productId" value={productId} />
      <label className="block text-sm font-medium text-slate-700">
        Rating
        <select
          name="rating"
          required
          className="mt-1 w-full rounded-lg bg-white px-3 py-2"
        >
          <option value="5">5 — Excellent</option>
          <option value="4">4 — Good</option>
          <option value="3">3 — Average</option>
          <option value="2">2 — Poor</option>
          <option value="1">1 — Bad</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Comment (optional)
        <textarea
          name="comment"
          rows={3}
          className="mt-1 w-full rounded-lg bg-white px-3 py-2"
          placeholder="Share your experience…"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Submit review
      </button>
    </form>
  );
}
