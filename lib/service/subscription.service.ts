import { currentUser } from "@clerk/nextjs/server";
import { getSubscriptionPlanFromUser } from "../constant/subscription-utils";
import { getPlanLimits } from "../constant/subscription-constants";
import type { SubscriptionPlan } from "../constant/subscription-constants";

export async function getServerSubscriptionPlan(): Promise<SubscriptionPlan> {
    const user = await currentUser();
    return getSubscriptionPlanFromUser(user);
}

export async function getServerSubscriptionLimits() {
    const plan = await getServerSubscriptionPlan();
    return getPlanLimits(plan);
}
