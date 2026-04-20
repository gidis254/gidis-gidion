"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const query = String(fd.get("q") ?? "").trim();
    if (!query) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form
      key={`${pathname}-${q}`}
      onSubmit={onSubmit}
      className="relative w-full"
      role="search"
    >
      <label htmlFor="site-search" className="sr-only">
        Search products
      </label>
      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>
      <input
        id="site-search"
        name="q"
        type="search"
        autoComplete="off"
        placeholder="Search products, categories, or keywords…"
        defaultValue={q}
        className="w-full rounded-2xl bg-zinc-100 py-3.5 pl-12 pr-24 text-base text-slate-900 shadow-inner outline-none ring-0 placeholder:text-zinc-500 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-sky-400/40"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
      >
        Search
      </button>
    </form>
  );
}
