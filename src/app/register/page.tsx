import Link from "next/link";
import { registerUser } from "@/app/actions/auth";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function RegisterPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const errMsg =
    error === "exists"
      ? "That email is already registered."
      : error === "invalid"
        ? "Please check your input."
        : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="text-center text-2xl font-bold text-slate-900">
        Create account
      </h1>
      <p className="mt-2 text-center text-sm text-zinc-600">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-sky-600 hover:underline">
          Sign in
        </Link>
      </p>
      {errMsg && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm text-red-700">
          {errMsg}
        </p>
      )}
      <form action={registerUser} className="mx-auto mt-8 max-w-md space-y-4">
        <label className="block text-sm font-medium text-slate-800">
          Name (optional)
          <input
            name="name"
            type="text"
            className="mt-1 w-full rounded-xl bg-zinc-100 px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-sky-400/40"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl bg-zinc-100 px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-sky-400/40"
          />
        </label>
        <label className="block text-sm font-medium text-slate-800">
          Password (min 6 characters)
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-1 w-full rounded-xl bg-zinc-100 px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-sky-400/40"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-xl bg-slate-800 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
