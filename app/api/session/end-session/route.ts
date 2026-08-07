import * as response from "@/utils/api-response";
import * as service from "@/lib/service/end-session.service";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { sessionId, durationSeconds } = body as {
            sessionId?: string;
            durationSeconds?: number;
        };

        if (!sessionId) {
            return response.badRequest("sessionId is required");
        }

        const result = await service.endVoiceSession(
            sessionId,
            durationSeconds ?? 0,
        );
        return response.created(result);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
