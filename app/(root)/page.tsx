"use client";
import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { useFetchAPI } from "@/lib/hooks/useFetchApi";
import { sampleBooks } from "@/lib/constant/constants";
import { IBook } from "@/types";

export default function Home() {
    const { data: books } = useFetchAPI<IBook[]>("/api/book");

    return (
        <section className="min-h-screen bg-[var(--bg-primary)] py-10">
            <div className="wrapper space-y-16">
                <HeroSection />

                <div className="library-books-grid">
                    {books?.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            coverURL={book.coverURL}
                            slug={book.slug}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
