import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

type Props = { searchParams: Promise<{ registered?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { registered } = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="text-center text-2xl font-bold text-slate-900">
        Sign in
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-600">
        New here?{" "}
        <Link href="/register" className="font-semibold text-sky-600 hover:underline">
          Create an account
        </Link>
      </p>
      {registered && (
        <p className="mt-4 rounded-lg bg-sky-50 px-3 py-2 text-center text-sm text-sky-900">
          Account created. Sign in with your email and password.
        </p>
      )}
      <div className="mt-8">
        <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-zinc-100" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
