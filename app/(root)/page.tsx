import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { sampleBooks } from "@/lib/constants";

export default async function Home() {
    return (
        <section className="min-h-screen bg-[var(--bg-primary)] py-10">
            <div className="wrapper space-y-16">
                <HeroSection />

                <div className="library-books-grid">
                    {sampleBooks.map((book) => (
                        <BookCard
                            key={book._id}
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
