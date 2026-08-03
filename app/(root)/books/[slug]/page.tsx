import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BookDetailsPage from "@/components/bookPageComponents/BookDetailsPage";
import * as service from "@/lib/service/book.service";

interface SlugProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: SlugProps) {
    const { slug } = await params;
    // const { userId } = await auth();

    // if (!userId) {
    //     redirect("/");
    // }

    const book = await service.getBookBySlug(slug);

    if (!book) {
        redirect("/");
    }

    return <BookDetailsPage book={book} />;
}
