import { prisma } from "../db";
import type { Prisma } from "../generated/prisma/client";

// dine ka gagawa nung prisma call then bato mo sa API Route handler to
export function findAll() {
  return prisma.book.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function create(data: Prisma.BookCreateInput) {
  return prisma.book.create({ data });
}

// for duplication checking
export function findByTitle(title: string) {
  return prisma.book.findFirst({
    where: { title },
  });
}

// export function slugify(title: string): string {
//   return title
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/(^-|-$)/g, "");
// }
