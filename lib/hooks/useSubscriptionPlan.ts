"use client";

import { useUser } from "@clerk/nextjs";
import { getSubscriptionPlanFromUser } from "@/lib/constant/subscription-utils";
import type { SubscriptionPlan } from "@/lib/constant/subscription-constants";

export function useSubscriptionPlan() {
    const { user, isLoaded, isSignedIn } = useUser();

    const plan: SubscriptionPlan = user
        ? getSubscriptionPlanFromUser(user)
        : "free";

    return {
        plan,
        isLoading: !isLoaded,
        isSignedIn,
    };
}
