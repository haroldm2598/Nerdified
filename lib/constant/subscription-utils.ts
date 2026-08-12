import { auth } from "@clerk/nextjs/server";
import { getPlanLimits, type SubscriptionPlan } from "./subscription-constants";

export async function getSubscriptionPlanFromUser(): Promise<SubscriptionPlan> {
    try {
        const { has } = await auth();

        if (has({ plan: "pro" })) {
            return "pro";
        }

        if (has({ plan: "standard" })) {
            return "standard";
        }

        return "free";
    } catch {
        return "free";
    }
}

export async function getSubscriptionLimitsFromUser() {
    const plan = await getSubscriptionPlanFromUser();
    return getPlanLimits(plan);
}
