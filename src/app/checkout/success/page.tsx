import Link from "next/link";

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
      <div className="rounded-3xl bg-white p-10 shadow-lg">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-2xl text-sky-700">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Thank you!</h1>
        <p className="mt-2 text-zinc-600">
          Your payment was received in KES. We&apos;ll send a confirmation when
          your order ships.
        </p>
        {session_id && (
          <p className="mt-4 break-all text-xs text-zinc-400">
            Session: {session_id}
          </p>
        )}
        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Keep shopping
        </Link>
      </div>
    </div>
  );
}
