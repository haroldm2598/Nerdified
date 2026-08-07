import { EndSessionResult } from "@/types";
import * as repository from "../repositories/voice-session.repository";

export async function endVoiceSession(
    sessionId: string,
    durationSeconds: number,
): Promise<EndSessionResult> {
    await repository.updateById(sessionId, {
        endedAt: new Date(),
        durationSeconds,
    });

    return {
        success: true,
    };
}
