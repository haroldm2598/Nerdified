import { prisma } from "../db";
import type { Prisma } from "../generated/prisma/client";

export function findAll() {
    return prisma.book.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}

export function findBySlug(slug: string) {
    return prisma.book.findUnique({
        where: { slug },
    });
}

export function create(data: Prisma.BookCreateInput) {
    return prisma.book.create({ data });
}

export function deleteBySlug(slug: string) {
    return prisma.book.delete({
        where: { slug },
    });
}

export function countByClerkId(clerkId: string) {
    return prisma.book.count({
        where: {
            clerkId,
        },
    });
}

export function searchBookSegments(
    bookId: string,
    query: string,
    segmentCount = 3,
) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return [];
    }

    const take = Math.max(1, Math.min(segmentCount || 3, 10));

    return prisma.bookSegment.findMany({
        where: {
            bookId,
            content: {
                contains: trimmedQuery,
                mode: "insensitive",
            },
        },
        orderBy: {
            segmentIndex: "asc",
        },
        take,
        select: {
            content: true,
            segmentIndex: true,
        },
    });
}

// for duplication checking
export function findByTitle(title: string) {
    return prisma.book.findFirst({
        where: { title },
    });
}
