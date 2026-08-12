export type SubscriptionPlan = "free" | "standard" | "pro";

export interface SubscriptionPlanLimits {
    plan: SubscriptionPlan;
    label: string;
    maxBooks: number;
    maxSessionsPerMonth: number | null;
    maxSessionMinutes: number;
    allowSessionHistory: boolean;
}

export const SUBSCRIPTION_PLAN_LIMITS: Record<
    SubscriptionPlan,
    SubscriptionPlanLimits
> = {
    free: {
        plan: "free",
        label: "Free",
        maxBooks: 1,
        maxSessionsPerMonth: 5,
        maxSessionMinutes: 5,
        allowSessionHistory: false,
    },
    standard: {
        plan: "standard",
        label: "Standard",
        maxBooks: 10,
        maxSessionsPerMonth: 100,
        maxSessionMinutes: 15,
        allowSessionHistory: true,
    },
    pro: {
        plan: "pro",
        label: "Pro",
        maxBooks: 100,
        maxSessionsPerMonth: null,
        maxSessionMinutes: 60,
        allowSessionHistory: true,
    },
};

export const getPlanLimits = (
    plan: SubscriptionPlan,
): SubscriptionPlanLimits => {
    return SUBSCRIPTION_PLAN_LIMITS[plan] ?? SUBSCRIPTION_PLAN_LIMITS.free;
};

export const getCurrentBillingPeriodStart = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
};
