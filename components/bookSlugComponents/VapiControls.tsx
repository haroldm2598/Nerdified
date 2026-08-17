"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mic, MicOff, Trash2 } from "lucide-react";

import useVapi from "@/lib/hooks/useVapi";
import { IBook } from "@/types";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteBookMutation } from "@/lib/react-query/books";
import Transcript from "./Transcript";

interface VapiControlsProps {
    book: IBook;
}

function VapiControls({ book }: VapiControlsProps) {
    const router = useRouter();
    const { toast } = useToast();
    const [isDeleting, setIsDeleting] = useState(false);
    const deleteBookMutation = useDeleteBookMutation();

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

    const deleteBook = async () => {
        setIsDeleting(true);

        try {
            await deleteBookMutation.mutateAsync(book.slug);

            toast({
                title: "Book deleted",
                description: `"${book.title}" was removed successfully.`,
                duration: 4000,
            });

            window.setTimeout(() => {
                router.push("/");
            }, 300);
        } catch (error) {
            toast({
                title: "Delete failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while deleting the book.",
                variant: "destructive",
                duration: 4000,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDelete = () => {
        toast({
            title: "Delete this book?",
            description: "This action cannot be undone.",
            duration: 6000,
            action: (
                <ToastAction altText="Delete book" onClick={deleteBook}>
                    Delete
                </ToastAction>
            ),
        });
    };

    return (
        <>
            {/* Header Component */}

            <section className="vapi-header-card relative">
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
                            aria-label={
                                isActive
                                    ? "Stop voice session"
                                    : "Start voice session"
                            }
                            title={
                                isActive
                                    ? "Stop voice session"
                                    : "Start voice session"
                            }
                            className={`vapi-mic-btn shadow-md ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive bg-black"}`}
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
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                            <h1 className="font-serif text-2xl font-bold text-[#212a3b] sm:text-3xl">
                                {book.title}
                            </h1>
                            <p className="text-lg font-medium text-[#3d485e]">
                                by {book.author}
                            </p>
                        </div>

                        <button
                            type="button"
                            aria-label="Delete book"
                            title="Delete book"
                            disabled={isDeleting}
                            onClick={handleDelete}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2 className="size-4" />
                        </button>
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
