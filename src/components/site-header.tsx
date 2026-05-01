import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import { getCart } from "@/app/actions/cart";
import { BackTab } from "@/components/back-tab";
import { SearchForm } from "@/components/search-form";
import { SignOutButton } from "@/components/sign-out-button";

export async function SiteHeader() {
  const session = await auth();
  const { count } = await getCart();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md shadow-zinc-200/80">
      <div className="mx-auto max-w-7xl px-4 pt-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
          <Link href="/" className="flex flex-col leading-tight hover:opacity-80 transition">
            <span className="text-lg font-extrabold tracking-wide text-slate-900">
              GIDIS
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.2em] text-amber-700">
              KITCHEN SHOP
            </span>
          </Link>

          <nav className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium text-slate-700">
            <Link
              href="/"
              className="rounded-full bg-amber-100 px-3 py-1.5 text-amber-900 font-semibold hover:bg-amber-200 transition flex items-center gap-1"
              title="Back to home"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v8" />
              </svg>
              Home
            </Link>
            <BackTab />
            <Link href="/products" className="hover:text-sky-700">
              Shop
            </Link>
            <Link
              href="/cart"
              className="relative inline-flex items-center rounded-full bg-zinc-100 px-3 py-1.5 text-slate-800 hover:bg-zinc-200"
            >
              Cart
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-600 px-1 text-xs font-bold text-white">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            {session?.user ? (
              <div className="flex items-center gap-2">
                <span className="hidden max-w-[8rem] truncate text-xs text-zinc-500 sm:inline">
                  {session.user.name || session.user.email}
                </span>
                <SignOutButton />
              </div>
            ) : (
              <>
                <Link href="/login" className="hover:text-sky-700">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-sky-600 px-3 py-1.5 text-white hover:bg-sky-500"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="pb-4">
          <Suspense
            fallback={
              <div className="h-14 w-full animate-pulse rounded-2xl bg-zinc-100" />
            }
          >
            <SearchForm />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
