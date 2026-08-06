import { IBook, Messages } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_VOICE } from "../constants";

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
        setStatus("connecting");

        try {
        } catch (e) {
            console.error("Error starting call", e);
            setStatus("idle");
            setLimitError("Failed to start the session. Please try again.");
        }
    };
    const stop = async () => {};
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
