import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mic, MicOff } from "lucide-react";
import { IBook } from "@/types";

interface BookDetailsPageProps {
    book: IBook;
}

export default function BookDetailsPage({ book }: BookDetailsPageProps) {
    const voiceLabel = book.persona?.trim() ? book.persona : "Default";

    return (
        <main className="book-page-container">
            <Link href="/" className="back-btn-floating" aria-label="Go back">
                <ArrowLeft className="size-5 text-[#212a3b]" />
            </Link>

            <div className="mx-auto flex max-w-4xl flex-col gap-6">
                <section className="vapi-header-card">
                    <div className="vapi-cover-wrapper">
                        <Image
                            src={book.coverURL}
                            alt={book.title}
                            width={162}
                            height={240}
                            className="vapi-cover-image"
                        />

                        <div className="vapi-mic-wrapper">
                            <button
                                type="button"
                                className="vapi-mic-btn vapi-mic-btn-inactive"
                                aria-label="Start talking"
                            >
                                <MicOff className="size-5 text-[#212a3b]" />
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
                                <span className="vapi-status-text">
                                    0:00/15:00
                                </span>
                            </span>
                        </div>
                    </div>
                </section>

                <section className="transcript-container">
                    <div className="transcript-empty">
                        <Mic className="size-12 text-[#212a3b]" />
                        <p className="transcript-empty-text">
                            No conversation yet
                        </p>
                        <p className="transcript-empty-hint">
                            Click the mic button above to start talking
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
