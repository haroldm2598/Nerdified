"use client";

import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { useBooksQuery } from "@/lib/react-query/books";

export default function Home() {
    const {
        data: books = [],
        isPending,
        isError,
        error,
        isFetching,
        isStale,
        refetch,
    } = useBooksQuery();

    return (
        <section className="min-h-screen bg-(--bg-primary) py-10">
            <div className="wrapper space-y-16">
                <HeroSection />

                {isPending ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
                        Loading your library...
                    </div>
                ) : isError ? (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
                        <p className="font-medium">Unable to load books.</p>
                        <p className="mt-2 text-sm">{error?.message}</p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-4 rounded-md bg-rose-600 px-3 py-2 text-sm font-medium text-white"
                        >
                            Retry
                        </button>
                    </div>
                ) : books.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-slate-600">
                        Your library is empty. Add your first book to get
                        started.
                    </div>
                ) : (
                    <>
                        {isStale && !isFetching && (
                            <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                                Showing cached data while the latest books
                                refresh in the background.
                            </div>
                        )}

                        {isFetching && !isPending && (
                            <div className="text-sm text-slate-500">
                                Refreshing your book list in the background...
                            </div>
                        )}

                        <div className="library-books-grid">
                            {books.map((book) => (
                                <BookCard
                                    key={book.id}
                                    title={book.title}
                                    author={book.author}
                                    coverURL={book.coverURL}
                                    slug={book.slug}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
