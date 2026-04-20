import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "gidis_guest_id";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  if (!request.cookies.get(COOKIE)?.value) {
    res.cookies.set(COOKIE, crypto.randomUUID(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 400,
    });
  }
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
