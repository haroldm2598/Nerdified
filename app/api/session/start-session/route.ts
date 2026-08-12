import * as response from "@/utils/api-response";
import * as service from "@/lib/service/start-session.service";
import { currentUser } from "@clerk/nextjs/server";
import { getSubscriptionPlanFromUser } from "@/lib/constant/subscription-utils";

export async function POST(request: Request) {
    try {
        const user = await currentUser();

        if (!user?.id) {
            return response.badRequest(
                "Unauthorized: Please sign in to start a session.",
            );
        }

        const body = await request.json();
        const { bookId } = body as {
            bookId?: string;
        };

        if (!bookId) {
            return response.badRequest("bookId is required");
        }

        const plan = await getSubscriptionPlanFromUser();
        const result = await service.createVoiceSession(user.id, bookId, plan);
        return response.created(result);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
