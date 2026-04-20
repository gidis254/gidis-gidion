"use client";

import { useRouter } from "next/navigation";

export function BackTab() {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="rounded-full bg-zinc-100 px-3 py-1.5 text-slate-800 hover:bg-zinc-200"
      aria-label="Go back"
    >
      Back
    </button>
  );
}
