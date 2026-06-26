import BookCard from "@/components/BookCard";
import HeroSection from "@/components/HeroSection";
import { sampleBooks } from "@/lib/constants";
<<<<<<< HEAD
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: post } = await supabase.from("post").select();
=======
>>>>>>> parent of 1f8fc1a (feat: supabase added)

export default function Home() {
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
<<<<<<< HEAD

                <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
                    <h2 className="mb-3 text-lg font-semibold">
                        Supabase post
                    </h2>
                    <ul className="space-y-2">
                        {post?.map((todo) => (
                            <li key={todo.id} className="text-sm text-gray-300">
                                {todo.title}
                            </li>
                        ))}
                    </ul>
                </div>
=======
>>>>>>> parent of 1f8fc1a (feat: supabase added)
            </div>
        </section>
    );
}
