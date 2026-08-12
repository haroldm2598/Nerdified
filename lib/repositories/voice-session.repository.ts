import { prisma } from "../db";
import type { Prisma } from "../generated/prisma/client";

export function create(data: Prisma.VoiceSessionCreateInput) {
    return prisma.voiceSession.create({ data });
}

export function countByClerkIdAndBillingPeriodStart(
    clerkId: string,
    billingPeriodStart: Date,
) {
    return prisma.voiceSession.count({
        where: {
            clerkId,
            billingPeriodStart,
        },
    });
}

export function updateById(id: string, data: Prisma.VoiceSessionUpdateInput) {
    return prisma.voiceSession.update({
        where: { id },
        data,
    });
}
