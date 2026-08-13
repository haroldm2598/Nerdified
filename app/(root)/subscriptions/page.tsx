"use client";

import { PricingTable, Show } from "@clerk/nextjs";
import { useSubscriptionPlan } from "@/lib/hooks/useSubscriptionPlan";

export default function SubscriptionsPage() {
    const { plan, isLoading, isSignedIn } = useSubscriptionPlan();

    return (
        <main className="clerk-subscriptions">
            <div className="wrapper max-w-6xl space-y-12">
                <div className="text-center">
                    <p className="page-title">Subscription Plans</p>
                    <p className="page-description max-w-3xl mx-auto">
                        Choose the plan that fits your reading and voice session
                        needs. Upgrade anytime to unlock more books, more
                        sessions, and longer live audio.
                    </p>
                </div>

                <div className="pricing-panel space-y-8">
                    <div className="pricing-panel-inner rounded-3xl border border-(--border-subtle) border-(--accent-light)] p-8">
                        <p className="text-sm uppercase tracking-[0.24em] text-(--text-secondary)">
                            Clerk Billing
                        </p>
                        <h2 className="mt-2 text-3xl font-bold text-(--text-primary)">
                            Manage your plan and billing.
                        </h2>
                        <div className="subscription-current-plan mt-6">
                            <p className="text-sm text-(--text-secondary)">
                                {isLoading
                                    ? "Checking your plan..."
                                    : isSignedIn
                                      ? `Current plan: ${plan.charAt(0).toUpperCase() + plan.slice(1)}`
                                      : "Sign in to view your plan."}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-(--border-subtle) bg-white p-6 shadow-(--shadow-soft)">
                        <Show when="signed-in">
                            <PricingTable />
                        </Show>

                        <Show when="signed-out">
                            <div className="rounded-3xl border border-(--border-subtle) bg-(--accent-light) p-10 text-center">
                                <p className="text-xl font-semibold text-(--text-primary)">
                                    Sign in to manage billing and plan details.
                                </p>
                                <p className="mt-3 text-(--text-secondary)">
                                    Your subscriptions are handled through
                                    Clerk. Once you sign in, you can select or
                                    upgrade your plan here.
                                </p>
                            </div>
                        </Show>
                    </div>
                </div>
            </div>
        </main>
    );
}
