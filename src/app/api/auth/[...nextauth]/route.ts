import type { NextRequest } from "next/server";
import { handlers } from "@/auth";

export const runtime = "nodejs";

function jsonError(status: number, error: unknown) {
  const message =
    error instanceof Error ? error.message : "Authentication request failed";
  console.error("[next-auth route]", error);
  return Response.json({ message }, { status });
}

/** Handlers are `(req) => Response`; wrap so failures return JSON (not HTML) for SessionProvider. */
export async function GET(req: NextRequest) {
  try {
    return await handlers.GET(req);
  } catch (error) {
    return jsonError(500, error);
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handlers.POST(req);
  } catch (error) {
    return jsonError(500, error);
  }
}
