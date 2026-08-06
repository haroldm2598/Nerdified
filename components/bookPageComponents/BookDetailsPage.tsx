import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IBook } from "@/types";

import VapiControls from "./VapiControls";

interface BookDetailsPageProps {
    book: IBook;
}

export default function BookDetailsPage({ book }: BookDetailsPageProps) {
    // const voiceLabel = book.persona?.trim() ? book.persona : "Default";

    return (
        <main className="book-page-container">
            <Link href="/" className="back-btn-floating" aria-label="Go back">
                <ArrowLeft className="size-5 text-[#212a3b]" />
            </Link>

            <div className="mx-auto flex max-w-4xl flex-col gap-6">
                <VapiControls book={book} />
            </div>
        </main>
    );
}
