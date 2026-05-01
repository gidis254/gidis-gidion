import type { Prisma } from "@prisma/client";

/**
 * Match every word against name, description, category, or slug (AND between words).
 */
export function productSearchWhereFromQuery(
  q: string | undefined
): Prisma.ProductWhereInput {
  const trimmed = q?.trim();
  if (!trimmed) return {};
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length === 0) return {};

  return {
    AND: words.map((word) => ({
      OR: [
        { name: { contains: word } },
        { description: { contains: word } },
        { category: { name: { contains: word } } },
        { category: { slug: { contains: word } } },
        { slug: { contains: word } },
      ],
    })),
  };
}
