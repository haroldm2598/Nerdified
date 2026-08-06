'use client'
import { useEffect, useMemo, useRef } from "react";
import { Mic } from "lucide-react";

import { Messages } from "@/types";

interface TranscriptProps {
    messages: Messages[];
    currentMessage: string;
    currentUserMessage: string;
}

function Transcript({
    messages,
    currentMessage,
    currentUserMessage,
}: TranscriptProps) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const transcriptRef = useRef<HTMLDivElement | null>(null);

    const renderedMessages = useMemo(() => {
        const list: Array<Messages & { isStreaming?: boolean }> = [...messages];

        if (currentUserMessage.trim()) {
            list.push({
                role: "user",
                content: currentUserMessage,
                isStreaming: true,
            });
        }

        if (!currentUserMessage.trim() && currentMessage.trim()) {
            list.push({
                role: "assistant",
                content: currentMessage,
                isStreaming: true,
            });
        }

        return list;
    }, [messages, currentMessage, currentUserMessage]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [renderedMessages.length, currentMessage, currentUserMessage, messages]);

    const isEmpty =
        messages.length === 0 && !currentMessage && !currentUserMessage;

    return (
        <section className="transcript-container">
            {isEmpty ? (
                <div className="transcript-empty">
                    <Mic className="size-12 text-[#212a3b]" />
                    <p className="transcript-empty-text">No conversation yet</p>
                    <p className="transcript-empty-hint">
                        Click the mic button above to start talking
                    </p>
                </div>
            ) : (
                <div className="transcript-messages" ref={transcriptRef}>
                    {renderedMessages.map((message, index) => {
                        const isUser = message.role === "user";
                        const wrapperClass = isUser
                            ? "transcript-message transcript-message-user"
                            : "transcript-message transcript-message-assistant";
                        const bubbleClass = isUser
                            ? "transcript-bubble transcript-bubble-user"
                            : "transcript-bubble transcript-bubble-assistant";

                        return (
                            <div
                                key={`${message.role}-${index}`}
                                className={wrapperClass}
                            >
                                <div className={bubbleClass}>
                                    {message.content}
                                    {message.isStreaming && (
                                        <span className="transcript-cursor" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </section>
    );
}

export default Transcript;
