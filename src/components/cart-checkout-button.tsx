"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartCheckoutButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function pay() {
    setMsg(null);
    if (status === "loading") return;
    if (!session?.user) {
      router.push("/login?callbackUrl=/cart");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error ?? "Checkout failed");
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
    } catch {
      setMsg("Network error");
    }
    setLoading(false);
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={pay}
        disabled={loading}
        className="w-full rounded-xl bg-sky-600 py-3 text-sm font-bold text-white shadow-md transition hover:bg-sky-500 disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Pay with Stripe (KES)"}
      </button>
      {!session?.user && (
        <p className="text-center text-xs text-zinc-600">
          Sign in to pay. You can add items as a guest, then sign in at checkout.
        </p>
      )}
      {msg && <p className="text-center text-sm text-red-600">{msg}</p>}
    </div>
  );
}
