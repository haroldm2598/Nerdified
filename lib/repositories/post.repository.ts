import { prisma } from "../db";

export async function findAll() {
    return prisma.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
}
