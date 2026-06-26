import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { createClient as createSupabaseClient } from "@/utils/supabase/middleware";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    const response = createSupabaseClient(request);

    if (!isPublicRoute(request)) {
        await auth.protect();
    }

    return response;
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/__clerk/:path*",
    ],
};
