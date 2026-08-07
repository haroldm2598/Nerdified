import * as response from "@/utils/api-response";

export async function POST(clerkId: string, bookId: string) {
    try {
        // make this like book post repositories -> services -> api route handler
        // const session = await VoiceSession.create({
        //     clerkId: clerkId,
        //     bookId: bookId,
        //     startedAt: new Date(),
        //     billingPeriodStart: getCurrentBillingPeriodStart(),
        //     durationSeconds: 0,
        // })
        // return {
        //     success: true,
        //     sessionId: session.id.toString(),
        // }
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
