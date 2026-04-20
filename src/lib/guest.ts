import { cookies } from "next/headers";

const COOKIE = "gidis_guest_id";

export async function getGuestId(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value ?? null;
}
