"use client";

import Image from "next/image";
import { Mic, MicOff } from "lucide-react";

import useVapi from "@/lib/hooks/useVapi";
import { IBook } from "@/types";
import Transcript from "./Transcript";

interface VapiControlsProps {
    book: IBook;
}

function VapiControls({ book }: VapiControlsProps) {
    const {
        status,
        isActive,
        messages,
        currentMessage,
        currentUserMessage,
        duration,
        start,
        stop,
        clearErrors,
    } = useVapi(book);
    const voiceLabel = book.persona?.trim() ? book.persona : "Default";

    return (
        <>
            {/* Header Component */}

            <section className="vapi-header-card">
                <div className="vapi-cover-wrapper">
                    <Image
                        src={book.coverURL}
                        alt={book.title}
                        width={162}
                        height={240}
                        className="vapi-cover-image"
                    />

                    <div className="vapi-mic-wrapper relative">
                        {isActive &&
                            (status === "speaking" ||
                                status === "thinking") && (
                                <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75" />
                            )}
                        <button
                            onClick={isActive ? stop : start}
                            disabled={status === "connecting"}
                            type="button"
                            className={`vapi-mic-btn shadow-md ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"}`}
                            aria-label="Start talking"
                        >
                            {isActive ? (
                                <Mic className="size-5 text-white" />
                            ) : (
                                <MicOff className="size-5 text-[#212a3b]" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                    <div className="space-y-1">
                        <h1 className="font-serif text-2xl font-bold text-[#212a3b] sm:text-3xl">
                            {book.title}
                        </h1>
                        <p className="text-lg font-medium text-[#3d485e]">
                            by {book.author}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <span className="vapi-status-indicator">
                            <span className="vapi-status-dot vapi-status-dot-ready" />
                            <span className="vapi-status-text">Ready</span>
                        </span>

                        <span className="vapi-status-indicator">
                            <span className="vapi-status-text">
                                Voice: {voiceLabel}
                            </span>
                        </span>

                        <span className="vapi-status-indicator">
                            <span className="vapi-status-text">0:00/15:00</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* Transcript Component */}

            <div className="vapi-transcript-wrapper">
                <Transcript
                    messages={messages}
                    currentMessage={currentMessage}
                    currentUserMessage={currentUserMessage}
                />
            </div>
        </>
    );
}

export default VapiControls;
