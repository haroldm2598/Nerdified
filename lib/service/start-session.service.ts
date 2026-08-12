import { StartSessionResult } from "@/types";
import * as repository from "../repositories/voice-session.repository";
import {
    getCurrentBillingPeriodStart,
    getPlanLimits,
    type SubscriptionPlan,
} from "../constant/subscription-constants";

export async function createVoiceSession(
    clerkId: string,
    bookId: string,
    plan: SubscriptionPlan,
): Promise<StartSessionResult> {
    const billingPeriodStart = getCurrentBillingPeriodStart();
    const limits = getPlanLimits(plan);

    const sessionCount = await repository.countByClerkIdAndBillingPeriodStart(
        clerkId,
        billingPeriodStart,
    );

    if (
        limits.maxSessionsPerMonth !== null &&
        sessionCount >= limits.maxSessionsPerMonth
    ) {
        throw new Error(
            `You have reached the ${limits.label} plan limit of ${limits.maxSessionsPerMonth} sessions this month. Upgrade to continue.`,
        );
    }

    const session = await repository.create({
        clerkId,
        startedAt: new Date(),
        billingPeriodStart,
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
        maxDurationMinutes: limits.maxSessionMinutes,
    };
}
