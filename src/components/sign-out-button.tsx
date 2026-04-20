"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-zinc-200"
    >
      Sign out
    </button>
  );
}
