import { getPlanLimits, type SubscriptionPlan } from "./subscription-constants";

export function hasSubscriptionPlan(
    user: any,
    plan: SubscriptionPlan,
): boolean {
    if (!user || typeof user.has !== "function") {
        return false;
    }

    try {
        return Boolean(user.has("subscription", plan));
    } catch {
        return false;
    }
}

export function getSubscriptionPlanFromUser(user: any): SubscriptionPlan {
    if (hasSubscriptionPlan(user, "pro")) {
        return "pro";
    }

    if (hasSubscriptionPlan(user, "standard")) {
        return "standard";
    }

    return "free";
}

export function getSubscriptionLimitsFromUser(user: any) {
    return getPlanLimits(getSubscriptionPlanFromUser(user));
}
