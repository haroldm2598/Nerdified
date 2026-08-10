import { StartSessionResult } from "@/types";
import * as repository from "../repositories/voice-session.repository";
import { getCurrentBillingPeriodStart } from "../constant/subscription-constants";

export async function createVoiceSession(
    clerkId: string,
    bookId: string,
): Promise<StartSessionResult> {
    const session = await repository.create({
        clerkId,
        startedAt: new Date(),
        billingPeriodStart: getCurrentBillingPeriodStart(),
        durationSeconds: 0,
        book: {
            connect: {
                id: bookId,
            },
        },
    });

    return {
        success: true,
        sessionId: session.id,
        // maxDurationMinutes: check.maxDurationMinutes
    };
}
