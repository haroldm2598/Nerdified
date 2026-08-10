import { IBook, Messages } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    ASSISTANT_ID,
    DEFAULT_VOICE,
    VOICE_SETTINGS,
} from "../constant/constants";
import Vapi from "@vapi-ai/web";
import { getVoice } from "../utils";

export type CallStatus =
    | "idle"
    | "connecting"
    | "starting"
    | "listening"
    | "thinking"
    | "speaking";

const useLatestRef = <T>(value: T) => {
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
};

type VapiTranscriptMessage = {
    type?: string;
    transcriptType?: "partial" | "final";
    transcript?: string;
    role?: "assistant" | "user";
};

const VAPI_API_KEY = process.env.NEXT_PUBLIC_VAPI_API_KEY || "";
let vapi: InstanceType<typeof Vapi>;

function getVapi() {
    if (!vapi) {
        if (!VAPI_API_KEY) {
            throw new Error(
                "VAPI_API_KEY is not defined in environment variables.",
            );
        }

        vapi = new Vapi(VAPI_API_KEY);
    }

    return vapi;
}

export function useVapi(book: IBook) {
    const { userId } = useAuth();

    const [status, setStatus] = useState<CallStatus>("idle");
    const [messages, setMessages] = useState<Messages[]>([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const [currentUserMessage, setCurrentUserMessage] = useState("");
    const [duration, setDuration] = useState(0);
    const [limitError, setLimitError] = useState<string | null>(null);

    const timeRef = useRef<NodeJS.Timeout | null>(null);
    const startTimerRef = useRef<NodeJS.Timeout | null>(null);
    const sessionIdRef = useRef<string | null>(null);
    const isStoppingRef = useRef<boolean>(false);

    const bookRef = useLatestRef(book);
    const durationRef = useLatestRef(duration);
    const voice = book.persona || DEFAULT_VOICE;

    const isActive =
        status === "listening" ||
        status === "thinking" ||
        status === "speaking" ||
        status === "starting";

    const addCompletedMessage = useCallback((role: string, content: string) => {
        const normalizedContent = content.trim();

        if (!normalizedContent) return;

        setMessages((prevMessages) => {
            const alreadyExists = prevMessages.some(
                (message) =>
                    message.role === role &&
                    message.content.trim() === normalizedContent,
            );

            if (alreadyExists) {
                return prevMessages;
            }

            return [...prevMessages, { role, content: normalizedContent }];
        });
    }, []);

    useEffect(() => {
        if (!VAPI_API_KEY) return;

        const handleMessage = (message: unknown) => {
            if (!message || typeof message !== "object") return;

            const payload = message as Partial<VapiTranscriptMessage>;
            const messageType = payload.type;
            const isTranscriptMessage =
                messageType === "transcript" ||
                messageType === "transcript[transcriptType='final']";

            if (!isTranscriptMessage) return;

            const transcriptType =
                payload.transcriptType ??
                (messageType === "transcript[transcriptType='final']"
                    ? "final"
                    : "partial");
            const transcript = payload.transcript?.trim();
            const role = payload.role;

            if (!transcript || !role) return;

            if (transcriptType === "partial") {
                if (role === "user") {
                    setCurrentUserMessage(transcript);
                    return;
                }

                setCurrentMessage(transcript);
                return;
            }

            setStatus("thinking");

            if (role === "user") {
                setCurrentUserMessage("");
                addCompletedMessage("user", transcript);
                return;
            }

            setCurrentMessage("");
            addCompletedMessage("assistant", transcript);
        };

        const vapiInstance = getVapi();
        vapiInstance.on("message", handleMessage);

        return () => {
            vapiInstance.off("message", handleMessage);
        };
    }, [addCompletedMessage]);
    // LIMITS
    // const maxDurationRef = useLatestRef(limits.maxSessionMinutes * 60);
    // const maxDurationSeconds
    // const remainingSeconds
    // const showTimeWarning

    const start = async () => {
        // first thing i need to create an API Route for this voiceSession needs

        if (!userId)
            return setLimitError(
                "User not authenticated. Please log in to start the session.",
            );

        setLimitError(null);
        setMessages([]);
        setCurrentMessage("");
        setCurrentUserMessage("");
        setStatus("connecting");

        try {
            const result = await fetch("/api/session/start-session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    clerkId: userId,
                    bookId: book.id,
                }),
            });

            if (!result.ok) {
                setLimitError(
                    "Failed to start the session in lib/hooks/useVapi. Please try again.",
                );
                setStatus("idle");
                return;
            }

            // gumagana naman kahit may error to find out mo nalang what cause the error is
            sessionIdRef.current = result.sessionId || null;

            const firstMessage = `Hey, good to meet you! Quick question, before we dive in: have you actually read ${book.title} yet? Or are we starting fresh?`;

            await getVapi().start(ASSISTANT_ID, {
                firstMessage,
                variableValues: {
                    title: book.title,
                    author: book.author,
                    bookId: book.id,
                },
                // voice: {
                //     provider: '11labs' as const,
                //     voiceId: getVoice(voice).id,
                //     model: 'eleven_turbo_v2_5' as const,
                //     stability: VOICE_SETTINGS.stability,
                //     similarityBoost: VOICE_SETTINGS.similarityBoost,
                //     style: VOICE_SETTINGS.style,
                //     useSpeakerBoost: VOICE_SETTINGS.useSpeakerBoost,
                // }
            });
        } catch (e) {
            console.error("Error starting call", e);
            setStatus("idle");
            setLimitError("Failed to start the session. Please try again.");
        }
    };

    const stop = async () => {
        isStoppingRef.current = true;
        await getVapi().stop();
    };

    const clearErrors = () => {};

    return {
        status,
        isActive,
        messages,
        currentMessage,
        currentUserMessage,
        duration,
        start,
        stop,
        clearErrors,
        // maxDurationSeconds, remainingSeconds, showTimeWarning
    };
}

export default useVapi;
