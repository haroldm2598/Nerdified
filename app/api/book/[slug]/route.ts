import z from "zod";
import * as response from "@/utils/api-response";
import * as service from "@/lib/service/book.service";

interface BookSlugRouteContext {
    params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: BookSlugRouteContext) {
    try {
        const { slug } = await params;

        if (!slug || !z.string().min(1).safeParse(slug).success) {
            return response.badRequest("Invalid slug.");
        }

        const book = await service.getBookBySlug(slug);

        if (!book) {
            return response.notFound("Book not found.");
        }

        const serializedBook = JSON.parse(
            JSON.stringify(book, (_, value) =>
                typeof value === "bigint" ? value.toString() : value,
            ),
        );

        return response.ok(serializedBook);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
