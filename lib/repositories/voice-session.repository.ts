import { prisma } from "../db";
import type { Prisma } from "../generated/prisma/client";

export function create(data: Prisma.VoiceSessionCreateInput) {
    return prisma.voiceSession.create({ data });
}

export function updateById(id: string, data: Prisma.VoiceSessionUpdateInput) {
    return prisma.voiceSession.update({
        where: { id },
        data,
    });
}
