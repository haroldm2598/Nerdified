import * as response from "@/utils/api-response";
import * as service from "@/lib/service/start-session.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { clerkId, bookId } = body as {
            clerkId?: string;
            bookId?: string;
        };

        if (!clerkId || !bookId) {
            return response.badRequest("clerkId and bookId are required");
        }

        const result = await service.createVoiceSession(clerkId, bookId);
        return response.created(result);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
