"use client";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

function ProtectedPage({ children }: { children: React.ReactNode }) {
    // use this method is the component or page is SSR
    // const { userId, isAuthenticated } = await auth();
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return <div>Loading...</div>;

    if (!isSignedIn) {
        // redirect("/sign-in");
        return <RedirectToSignIn />;
    }

    return <>{children}</>;
}

export default ProtectedPage;
