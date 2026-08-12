"use client";

import { useAuth } from "@clerk/nextjs";
import type { SubscriptionPlan } from "@/lib/constant/subscription-constants";

export function useSubscriptionPlan() {
    const { isLoaded, isSignedIn, has } = useAuth();

    let plan: SubscriptionPlan = "free";

    if (isSignedIn && has) {
        if (has({ plan: "pro" })) {
            plan = "pro";
        } else if (has({ plan: "standard" })) {
            plan = "standard";
        }
    }

    return {
        plan,
        isLoading: !isLoaded,
        isSignedIn,
    };
}
