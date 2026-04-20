import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-slate-900 text-zinc-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <p className="text-sm font-extrabold tracking-wide text-white">GIDIS</p>
          <p className="text-xs tracking-[0.2em] text-amber-500/90">KITCHEN SHOP</p>
          <p className="mt-2 text-sm">
            Kitchen equipment and utensils. Prices shown in Kenyan shillings (KES).
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Shop
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/products" className="hover:text-white">
                All products
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-white">
                Search
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Account
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/login" className="hover:text-white">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} Gidis Kitchen Shop
      </div>
    </footer>
  );
}
