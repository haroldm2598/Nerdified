"use client";
import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { useFetchAPI } from "@/lib/api/useFetchApi";
import { sampleBooks } from "@/lib/constants";
import { IBook } from "@/types";

export default function Home() {
    // <IBook[]>
    // Planning to replace the supabase from id -> _id because of the typescript or maybe
    // change the types.d.ts in order to IBOOK work and check other api routes as well
    const { data: books } = useFetchAPI("/api/book");

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
