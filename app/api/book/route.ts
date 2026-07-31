import z from "zod";
import * as response from "@/utils/api-response";
import * as service from "@/lib/service/book.service";
import { CreateBookPayloadSchema } from "@/lib/validations/upload.validation";

export async function GET() {
    try {
        const books = await service.getBooks();

        const serializedBooks = JSON.parse(
            JSON.stringify(books, (_, value) =>
                typeof value === "bigint" ? value.toString() : value,
            ),
        );

        return response.ok(serializedBooks);
    } catch (error) {
        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = CreateBookPayloadSchema.parse(body);

        const createPayload = {
            clerkId: validated.clerkId ?? "unknown",
            title: validated.title,
            author: validated.author,
            persona: validated.persona,
            fileURL: validated.fileURL,
            fileBlobKey: validated.fileBlobKey,
            coverURL: validated.coverURL ?? "",
            coverBlobKey: validated.coverBlobKey,
            fileSize: validated.fileSize,
        };

        const bookCreated = await service.createBook(createPayload);
        const safeBookResponse = {
            ...bookCreated,
            fileSize: Number(bookCreated.fileSize),
        };

        return response.created(safeBookResponse);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return response.badRequest(
                error.issues.map((issue) => issue.message).join(", "),
            );
        }

        return response.serverError(
            error instanceof Error
                ? error.message
                : "An internal server error occurred",
        );
    }
}
